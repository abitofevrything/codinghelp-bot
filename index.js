// Require Node.js file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require config file
const config = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Register the commands and the events for the bot. New way for the bot to know what commands we are going to use and how to use them.
const { registerCommands, registerEvents } = require('./register.js');

// MySQL2 Includes
let connection;
const guildCommandPrefixes = new Map();


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.on('ready', () => {
	console.log(`${client.user.tag} is ready, ready, ready-edy-edy!`); //Spongebob reference! heh.

	// Grabs the prefix from the database
	client.guilds.cache.forEach(guild => {
		connection.query(
			`SELECT cmdPrefix FROM GuildSetup WHERE guildId = '${guild.id}'`
		).then(result => {
			guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
		}).catch(err => console.log(err));
	});
	

  // Sets Bot's Status
  client.user.setPresence({
    status: "dnd", 
    activity: {
        name: `${config.client.prefix}help`,  
        type: "PLAYING" 
    }
  });
});

// Adds guild to GuildSetup MySQL Database.
client.on('guildCreate', async (guild) => {
	try {
		await connection.query(
			`INSERT INTO GuildSetup VALUES('${guild.id}', '${guild.ownerID}')`
		);
	} catch(err) {
		console.log(err);
	}
});

client.on('message', async (message) => { // Looking for a message

/* ----------------------------------------------------------
NECESSARY PARTS OF THE FILE
-------------------------------------------------------------- */
if (message.author.bot) return;
const prefix = guildCommandPrefixes.get(message.guild.id);
if(message.content.toLowerCase().startsWith(prefix + 'test')) {
	message.channel.send(`You triggered this comamnd with prefix: ${prefix}`);
}
else if(message.content.toLowerCase().startsWith(prefix + 'changeprefix')) {
	if(message.member.id === message.guild.ownerID) {
		const [cmdName, newPrefix] = message.content.split(" ");
		if(newPrefix) {
			try {
				await connection.query(
					`UPDATE GuildSetup SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
				);
				guildCommandPrefixes.set(message.guild.id, newPrefix);
				message.channel.send(`Updated guild prefix to ${newPrefix}`);
			} catch(err) {
				console.log(err);
				message.channel.send(`Failed to update guild prefix to ${newPrefix}`);
			}
		} else {
			message.channel.send(`Incorrect amount of arguments.`);
		}
	} else {
		message.channel.send(`❌ You do not have permission to use this command. You must be the guild owner to use this command.`);
	}
}

}); // end of looking

// if there is an error
client.on('error', function(err) {
	console.log('Global error handler called:\n');
	if(err) {console.log(err);}
});

// async function that runs the bot and grabs all the necessary database, file and events stuff.
(async () => {
	connection = await require('./db.js');
	await client.login(config.client.token);
	client.commands = new Map();
	client.events = new Map();
	await registerCommands(client, './commands');
	await registerEvents(client, './events');
  })();
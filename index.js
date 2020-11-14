// Require Node.js file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require config file
const { prefix, token, config } = require('F:/LIVE_BOTS/codinghelp-bot/config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// login to Discord with your app's token
client.login(token);

// Read the Commands folder
const commandFiles = fs.readdirSync('F:/LIVE_BOTS/codinghelp-bot/commands').filter(file => file.endsWith('.js'));

// Include the other files we have
for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`F:/LIVE_BOTS/codinghelp-bot/commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setPresence({
		status: "dnd",  // You can show online, idle... Do not disturb is dnd
		activity: {
			name: "++help",  // The message shown
			type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
		}
	});
});

client.on('message', message => { // Looking for a message

/* ----------------------------------------------------------
NECESSARY PARTS OF THE FILE
-------------------------------------------------------------- */
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return;

if (!message.guild) return;

if (command.guildOnly && message.channel.type !== 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
}

if (command.args && !args.length) {
	let reply = `You didn't provide any arguments, ${message.author}!`;

	if (command.usage) {
		reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
	}

	return message.channel.send(reply);
}

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

}); // end of looking
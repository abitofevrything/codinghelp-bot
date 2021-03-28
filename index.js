const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json');

let connection = require('./database.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`${client.user.tag} is logged in and ready!`);

  client.user.setPresence({
    status: "online", 
    activity: {
        name: `the server. Run ++help to see my commands.`,  
        type: "LISTENING" 
    }
  });
});
  
  client.on('guildDelete', guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id}) by ${guild.owner.tag}`);

  });

  client.on('guildCreate', guild => {

    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members! The guild owner is ${guild.owner.tag}`);
  
    try {
      guild.members.cache.map( member => {
        connection.query(
             `INSERT INTO Points (guildId, user) VALUES (?, ?)`,
             [guild.id, user.id]
           );
      });
     }
     catch{console.log(error);}
     let challenge_role = guild.roles.cache.find(r => r.name === 'Participants');
     let challenge_channel = guild.channels.cache.find(c => c.name === 'challenges');
     if(!challenge_channel) {
      guild.channels.create('Challenges', {
          type: 'text',
          reason: 'Sakura Moon needed a Challenges channel for the Challenges handler.',
      }).then(console.log('The Challenges channel did not exist so I created one!')).catch(console.error);
  }
     let submissions_channel = guild.channels.cache.find(ch => ch.name === 'submissions');
     if(!submissions_channel) {
      guild.channels.create('Submissions', {
          type: 'text',
          reason: 'Sakura Moon needed a Submissions channel for the Challenges handler.'
      }).then(console.log('The Submissions channel did not exist so I created one!')).catch(console.error);
  }
  
  let participants = guild.members.cache.filter(member => member.roles.cache.find(role => role == challenge_role)).map(mems => {
    connection.query(
        `INSERT INTO Challenges (guildId, player, challengeAnnouncementsChannel, submissionsDumpChannel) VALUES (?, ?, ?, ?)`,
        [guild.id, mems.id, challenge_channel.id, submissions_channel.id]
      );
    });
  });

client.on('error', function (err) {
  console.log('Global error handler called:\n');
  if(err) {console.log(err);}
});

client.on('message', async message => { // Looking for a message

  /* ----------------------------------------------------------
  NECESSARY PARTS OF THE FILE
  -------------------------------------------------------------- */
  if (!message.content.startsWith(config.client.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return; 

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
  
  }); // end of looking

  (async () => {
    connection = await require('./database.js');
    await client.login(config.client.token);
  })();
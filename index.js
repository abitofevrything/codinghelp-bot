const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json');
const GhostPing = require('discord.js-ghost-ping');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log('---- GENERAL ----')
for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

const cmmandFiles = fs.readdirSync('./commands/suggs').filter(file => file.endsWith('.js'));
console.log('---- SUGGESTIONS SYSTEM ----')
for (const file of cmmandFiles) {
	console.log(file.slice(0,-3));
	const cmmand = require(`./commands/suggs/${file.slice(0,-3)}`)
	client.commands.set(cmmand.name, cmmand);
}

const cmandFiles = fs.readdirSync('./commands/challenges').filter(file => file.endsWith('.js'));
console.log('---- CHALLENGE SYSTEM ----')
for (const file of cmandFiles) {
	console.log(file.slice(0,-3));
	const cmand = require(`./commands/challenges/${file.slice(0,-3)}`)
	client.commands.set(cmand.name, cmand);
}


console.log('Are you logged in?')
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

/* setting up the ghost-ping detectors! */
client.on('messageDelete', message => {
  GhostPing.detector("messageDelete", message, {
    title: `Ghost Ping Detected`,
    color: `C0C0C0`,
    footer: `Don't Ghost Ping, smh`,
    picture: `https://i.imgur.com/k6pLhtU.png`,
    channel: `450906618234929152`
  })
});

client.on('messageUpdate', (oldMessage, newMessage) => { 
  GhostPing.detector('messageUpdate', oldMessage, newMessage)
});

client.on('message', async message => {
  if (message.author.bot) return;
const thnks = ['thanks', 'thnx', 'thank you', 'thank', 'tnx', 'ty', 'fixed', 'thanks a lot'];
for(let x = 0; x < thnks.length; x++){
    if (message.content.includes(thnks[x])){
      //message.reply('It seems like someone\'s problem was resolved! I\'m glad we were able to help you! Please use the `++thanks <@username or ID>` command to show your appreciation!');
      console.log('resolved! this works!'); //temporary until I get ++thanks working.
    }
    break;
  }
if(!message.content.startsWith(config.client.prefix)) return
  const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
if(!command) return;
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }


});

  (async () => {
    connection = await require('./database.js');
    await client.login(config.client.token);
  })();
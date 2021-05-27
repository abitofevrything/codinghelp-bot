const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json');
const GhostPing = require('discord.js-ghost-ping');
client.cooldowns = new Discord.Collection();
const { cooldowns } = client;

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
  console.log('--- LOGS BELOW ---')

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
    channel: `450906618234929152`,
    ingorePerms: ['ADMINISTRATOR', 'MANAGE_MESSAGES']
  })
});

client.on('messageUpdate', (oldMessage, newMessage) => { 
  GhostPing.detector('messageUpdate', oldMessage, newMessage)
});

client.on('message', async message => {
  if (message.author.bot) return;
  const thnks = [ 'thanks', 'thnx', 'thank',  'tnx',  'ty', 'Thanks', 'Thank', 'thx'];
  const isthanks = thnks.reduce((alrdyGood, curr) => alrdyGood || message.content.toLowerCase().split(' ').includes(curr), false);
  if(isthanks && !message.content.startsWith(config.client.prefix) && message.channel.parentID === '382210817636040706') {
    message.reply(`It seems like someone\'s problem was resolved! I\'m glad someone was able to help you! Please use the \`++thanks <@username or ID>\` command to show your appreciation!`);
  }

  const modRoles = ['780941276602302523', '822500305353703434'];

  if(message.channel.parentID === '382210817636040706' && message.member.roles.cache.has(`${modRoles}`)) {
    message.delete();
    message.reply(`Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!`);
  }

if(!message.content.startsWith(config.client.prefix)) return;
  const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

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
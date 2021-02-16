const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const {config, token, prefix} = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`${client.user.tag} is logged in and ready!`);

  client.user.setPresence({
    status: "dnd", 
    activity: {
        name: `++help`,  
        type: "LISTENING" 
    }
  });
});

client.on('error', function (err) {
  console.log('Global error handler called:\n');
  if(err) {console.log(err);}
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

client.login(token);
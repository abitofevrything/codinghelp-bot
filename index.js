const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json');
const GhostPing = require('discord.js-ghost-ping');
client.cooldowns = new Discord.Collection();
const { cooldowns } = client;
let connection;
const ownerID = config.bot.devId;

//client.on("error", (e) => console.error(e));
//client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));


function readFilesFromPath(pathString) {
  const directoryEntries = fs.readdirSync(pathString, {withFileTypes: true});

  return directoryEntries.reduce((filteredEntries, dirEnt) => {
      if (dirEnt.isDirectory()) {
          // If the entry is a directory, call this function again
          // but now add the directory name to the path string.
          filteredEntries.push(...readFilesFromPath(`${pathString}/${dirEnt.name}`))
      } else if (dirEnt.isFile()) {
          // Check if the entry is a file instead. And if so, check
          // if the file name ends with `.js`.
          if (dirEnt.name.endsWith('.js')) {
              // Add the file to the command file array.
              filteredEntries.push(`${pathString}/${dirEnt.name}`);
          }
      }

      return filteredEntries;
  }, []);
}

// Call the read files function with the root folder of the commands and
// store all the file paths in the constant.
const commandFilePaths = readFilesFromPath('./commands');

// Loop over the array of file paths and set the command on the client.
commandFilePaths.forEach((filePath) => {
  const command = require(filePath);

  client.commands.set(command.name, command);
});


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
    channel: `450906618234929152`,
    ignorePerms: ['ADMINISTRATOR', 'MANAGE_MESSAGES']
  })
});

client.on('messageUpdate', (oldMessage, newMessage) => { 
  GhostPing.detector('messageUpdate', oldMessage, newMessage)
});

client.on('message', async message => {
  if (message.author.bot) return; 
  const thnks = [ 'thanks', 'thnx', 'thank',  'tnx',  'ty', 'Thanks', 'Thank', 'thx'];
  const isthanks = thnks.reduce((alrdyGood, curr) => alrdyGood || message.content.toLowerCase().split(' ').includes(curr), false);
  if(isthanks && !message.content.startsWith(config.bot.prefix) && message.channel.parentID === '382210817636040706') {
    message.reply(`It seems like someone\'s problem was resolved! I\'m glad someone was able to help you! Please use the \`++thanks <@username or ID>\` command to show your appreciation!`);
  }

  const modRoles = ['780941276602302523', '822500305353703434'];

  if(message.channel.parentID === '382210817636040706' && message.member.roles.cache.has(`${modRoles}`)) {
    message.delete();
    message.reply(`Please do not ping the mods. If you need to contact them, please message <@575252669443211264> to open a ModMail ticket. Thank you!`);
  }

if(!message.content.startsWith(config.bot.prefix)) return;
  const args = message.content.slice(config.bot.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (command.modOnly === 'true' && !message.member.roles.cache.has(`${modRoles}`) || command.modOnly === 'yes' && !message.member.roles.cache.has(`${modRoles}`)) {
      message.reply(`Only Moderators can use this command. Moderators have <@${modRoles[0]}> role and the <@${modRoles[1]} role. Please run \`++report [issue]\` if you are seeing this in error.`);
      return;
  }

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
        command.execute(message, args, client);
      } catch (error) {
        console.error(error);
        const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('Oh no! An _error_ has appeared!')
          .setDescription(`**Contact Bot Owner:** <@${config.bot.devId}>`)
          .addFields(
            {name: '**Error Name:**', value: `\`${error.name}\``},
            {name: '**Error Message:**', value: `\`${error.message}\``},
            {name: '**Error Location:**', value: `\`${error.stack}\``},
            {name: '**Ways to Report:**', value: 'Please run \`++report [report message\` to report this!\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!'},
          )
          .setTimestamp()
          .setFooter(`Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`, `${client.user.displayAvatarURL()}`)
        message.channel.send(embed);
      }


});

  (async () => {
    connection = await require('./database.js');
    await client.login(config.bot.token);
  })();

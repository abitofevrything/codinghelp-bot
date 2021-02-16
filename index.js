const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const {config, token, prefix} = require('./config.json');

/* Files */
const firstMessage = require('./first-message');
const command = require('./command');
const privateMessage = require('./private-message');
const roleClaim = require('./role-claim');

/* Temporary Commands */
client.on('ready', () => {
  console.log(`${client.user.tag} is logged in and ready!`);

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!')
  });

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    });
});

command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      });
    }
});

command(client, 'ban', (message) => {
  const { member, mentions } = message;

  const tag = `<@${member.id}>`;

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('BAN_MEMBERS')
  ) {
    const target = mentions.users.first()
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.ban()
      message.channel.send(`${tag} That user has been`);
    } else {
      message.channel.send(`${tag} Please specify someone to ban.`);
    }
  } else {
    message.channel.send(
      `${tag} You do not have permission to use this command.`
    );
  }
});

command(client, 'kick', (message) => {
  const { member, mentions } = message;

  const tag = `<@${member.id}>`;

  if (
    member.hasPermission('ADMINISTRATOR') ||
    member.hasPermission('KICK_MEMBERS')
  ) {
    const target = mentions.users.first()
    if (target) {
      const targetMember = message.guild.members.cache.get(target.id);
      targetMember.kick()
      message.channel.send(`${tag} That user has kicked`);
    } else {
      message.channel.send(`${tag} Please specify someone to kick.`);
    }
  } else {
    message.channel.send(
      `${tag} You do not have permission to use this command.`
    );
  }
});

command(client, 'help', (message) => {
  message.channel.send(`
These are my supported commands:
**!help** - Displays the help menu
**!add <num1> <num2>** - Adds two numbers
**!sub <num1> <num2>** - Subtracts two numbers
`)
});

command(client, 'status', (message) => {
    const content = message.content.replace('++status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: `"${prefix}help" for help`,
      },
    });
});

roleClaim(client);

command(client, 'serverinfo', (message) => {
  const { guild } = message

  const { name, region, memberCount, owner, afkTimeout } = guild
  const icon = guild.iconURL()

  const embed = new Discord.MessageEmbed()
    .setTitle(`Server info for "${name}"`)
    .setThumbnail(icon)
    .addFields(
      {
        name: 'Region',
        value: region,
      },
      {
        name: 'Members',
        value: memberCount,
      },
      {
        name: 'Owner',
        value: owner.user.tag,
      },
      {
        name: 'AFK Timeout',
        value: afkTimeout / 60,
      }
    )

  message.channel.send(embed);
});
});

client.login(token);
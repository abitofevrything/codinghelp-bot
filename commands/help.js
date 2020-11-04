const { prefix, config } = require('/root/bots/ch-bot/config.json');
const Discord = require("discord.js");

const helpEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help Menu')
    .setDescription('Use `++help <command>` for more information.')
    .addFields(
        { name: 'Rules', value: '```css\nrule1\nrule2\nrule3\nrule4```', inline: true },
        { name: 'Messages', value: '```css\nelaborate\njustask\nshare-code\nfaq\nhire\npatience```', inline: true },
        { name: 'Utilities', value: '```css\nhelp\nping\n```', inline: true },
    );

    module.exports = {
        name: 'help', // name the command something
        description: 'Displays all information regarding commands', // Describe your command; shows this with the help command
        aliases: ['h', 'halp', 'commands'], // Include if you have other names you want to use for this command as well.
        usage: '[command name]',
        inHelp: 'yes',
        execute(message, args) {
    
            message.channel.send(helpEmbed);
    
        },
        
    };
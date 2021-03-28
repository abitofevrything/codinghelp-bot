const Discord = require('discord.js');

module.exports = {
    name: 'uptime',
    description: 'Tells you the uptime for the bot.',
    aliases: [],
    usage: '++uptime',
    execute(message, args) { 
        let days = Math.floor(message.client.uptime / 86400000);
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;
        
        message.channel.send(`__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };
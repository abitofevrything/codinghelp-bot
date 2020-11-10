module.exports = {
    name: 'mods', // name the command something
    description: 'Refers people to Modmail bot.', // Describe your command; shows this with the help command
    aliases: ['modmail', 'mod'], // Include if you have other names you want to use for this command as well.
    usage: '++[command]',
    execute(message, args) {
  
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
    },
    
  };
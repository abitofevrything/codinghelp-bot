module.exports = {
    name: 'hire', // name the command something
    description: 'Refers people to the hire-programmers channel to hire someone.', // Describe your command; shows this with the help command
    aliases: ['requests'], // Include if you have other names you want to use for this command as well.
    usage: '++[command]',
    inHelp: 'yes',
    execute(message, args) {
  
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
    },
    
  };
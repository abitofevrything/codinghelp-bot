module.exports = {
    name: 'docs', // name the command something
    description: 'Sends the user to check out our docs on our website.', // Describe your command; shows this with the help command
    aliases: ['useful-links'], // Include if you have other names you want to use for this command as well.
    execute(message, args) {
  
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
    },
    
  };
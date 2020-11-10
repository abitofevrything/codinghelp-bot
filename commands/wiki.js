module.exports = {
    name: 'wiki', // name the command something
    description: 'Refers people to the wiki for their questions.', // Describe your command; shows this with the help command
    aliases: ['knowledgebase', 'kb', 'site'], // Include if you have other names you want to use for this command as well.
    usage: '++[command]',
    execute(message, args) {
  
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
    },
    
  };
module.exports = {
  name: 'ping', // name the command something
  description: 'Makes sure the bot is online', // Describe your command; shows this with the help command
  aliases: ['hello', 'sup'], // Include if you have other names you want to use for this command as well.
  usage: '++[command]',
  execute(message, args) {

  message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
  },
  
};
module.exports = {
  name: 'ping', // name the command something
  description: 'Makes sure the bot is online.', // Describe your command; shows this with the help command
  aliases: ['p', 'pong', 'bing', 'bong', 'beep', 'boop'], // Include if you have other names you want to use for this command as well.
  usage: '++ping', // Shows how the commmand is used.
  inHelp: 'yes', // Necessary so that it displays the information in an Embed when using ++help [command]
  execute(message, args) {
    if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) 
    return message.channel.send(`🏓 Pong!`)
    else {message.reply(':x: You do not have permission to use this command!');}
  }
};
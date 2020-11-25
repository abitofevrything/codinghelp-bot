module.exports = {
  name: 'ping', // name the command something
  description: 'Makes sure the bot is online', // Describe your command; shows this with the help command
  aliases: ['hello', 'sup'], // Include if you have other names you want to use for this command as well.
  usage: '++ping',
  inHelp: 'yes',
  execute(message, args) {

    if(!message.member.hasPermission(['MANAGE_MEMBERS'])) 
    return message.reply(':x: You do not have permission to use this command!')
    else {message.channel.send(`🏓 Pong!`);}
  },
};

module.exports.help = {

}
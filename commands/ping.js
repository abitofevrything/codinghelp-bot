module.exports = {
  name: 'ping', 
  description: 'Makes sure the bot is online', 
  aliases: ['hello', 'sup'], 
  usage: '++ping',
  inHelp: 'yes',
  execute(message, args) {

    if(!message.member.hasPermission(['MANAGE_MEMBERS'])) 
    return message.reply(':x: You do not have permission to use this command!')
    else {message.channel.send(`🏓 Pong!`);}
  },
};
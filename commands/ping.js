module.exports = {
  name: 'ping',
  description: 'Makes sure the bot can hear commands.',
  aliases: [],
  usage: 's!ping',
  inHelp: 'yes',
  execute(message, args) { 
    if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) 
    return message.channel.send(`🏓 Pong!`)
    else {message.reply(':x: You do not have permission to use this command!');}
  }
};
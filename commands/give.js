const Discord = require("discord.js");
const points = new Discord.Collection();

module.exports = {
    name: 'give', 
    description: 'This is hwo you can give points to other users.\n**Note:** You must have MANAGE_MEMBERS permission to use this command.', 
    aliases: ['donate'], 
    usage: '++give @username or ID [number of points]',
    inHelp: 'yes',
    execute(message, args) {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) {
        message.reply(":x: Couldn't find that member!");
        return;
    }

    const key = `${message.guild.id}-${member.id}`;
    let memberPoints = points.get(key);
    if (!memberPoints) {
        memberPoints = {
          user: message.author.id,
          guild: message.guild.id,
          points: 0
        }
        points.set(key, memberPoints)  
      }
    memberPoints['points'] += 10;
    message.channel.send(`You gave 10 points to ${member}~`)
    return;
    

    }, // End Execute
    
  }; // End module.exports
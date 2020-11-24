const Discord = require("discord.js");
const points = new Discord.Collection();

module.exports = {
    name: 'thanks', 
    description: 'This is how you can give points to other users. Every time you thank them you give them 10 points.', 
    aliases: ['donate', 'give', 'thx', 'helped', 'helping'], 
    usage: '++thanks @username or ID',
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
    memberPoints['points'] += args[1];
    

    }, // End Execute
    
  }; // End module.exports
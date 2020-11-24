const Discord = require("discord.js");
const points = new Discord.Collection();

module.exports = {
    name: 'points', 
    description: 'This is how you can check your own points.', 
    aliases: ['pnts'], 
    usage: '++points',
    inHelp: 'yes',
    execute(message, args) {
  
        const key = `${message.guild.id}-${message.author.id}`;
   
        let memberPoints = points.get(key);
        if (!memberPoints) {
          memberPoints = {
            user: message.author.id,
            guild: message.guild.id,
            points: 0
          }
          points.set(key, memberPoints)  
        }
        message.reply(memberPoints['points'])
        return;

    }, // End Execute
    
  }; // End module.exports
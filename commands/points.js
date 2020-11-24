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
          points.set(key, memberPoints);  
        }
        if (memberPoints <= 499) {
          message.reply(`Hello! You have ` + memberPoints['points'] + ` points. Start chatting to earn points! If you help out our members, each time you are thanked, you get 50 points!`);
        }
        if (memberPoints >= 500) {
          message.reply(`Thank you! We appreciate you helping out our members! You have ` + memberPoints + ` points. Keep earning more points to get higher on our leaderboard!`);
        }
        

    }, // End Execute
    
  }; // End module.exports
const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

module.exports = {
    name: 'leaderboard', 
    description: 'This is how you can check the top 10 people on the leaderboard.', 
    aliases: ['ldrbd', 'top10', 'top'], 
    usage: '++leaderboard',
    inHelp: 'yes',
    execute(message, args) {
      let score;
      if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
          score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
        }
        score.points++;
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if(score.level < curLevel) {
          score.level++;
          message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
        client.setScore.run(score);
      }
      if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
          score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
        }
        score.points++;
        const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
        if(score.level < curLevel) {
          score.level++;
          message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
        }
        client.setScore.run(score);
      }
      const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

      // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.MessageEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL())
      .setDescription("Our top 10 points leaders!")
      .setColor(0x00AE86);
  
    for(const data of top10) {
      embed.addFields({ name: client.users.cache.get(data.user).tag, value: `${data.points} points (level ${data.level})` });
    }
    return message.channel.send({embed});

    }, // End Execute
    
  }; // End module.exports
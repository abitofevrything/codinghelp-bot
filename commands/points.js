const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

module.exports = {
    name: 'points', 
    description: 'This is how you can check your own points.', 
    aliases: ['pnts'], 
    usage: '++points',
    inHelp: 'yes',
    execute(message, args) {

   // Check if the table "points" exists.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
  
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
      const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

        if (curLevel === 1) {
          message.reply(`Hello! You have ` + score.points + ` points and are at level ` + score.level + `. Start chatting to earn points! If you help out our members, each time you are thanked, you get 50 points!`);
        }
        if (curLevel <= 9) {
          message.reply( `Hello! You have ` + score.points + ` points and are at level ` + score.level + `.`);
        }
        if (score.points >= 500) {
          message.reply(`Thank you! We appreciate you helping out our members! You have ` + score.points + ` points. Keep earning more points to get higher on our leaderboard! You are currently at level ` + score.level + `. Once you get `);
        }
        

    }, // End Execute
    
  }; // End module.exports
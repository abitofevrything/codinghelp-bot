const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

module.exports = {
    name: 'thanks', 
    description: 'This is how you can give points to other users. Every time you thank them you give them 50 points.', 
    aliases: ['donate', 'give', 'thx', 'helped', 'helping'], 
    usage: '++thanks @username or ID',
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

      const user = message.mentions.users.first() || client.users.cache.get(args[0]);
      if(!user) return message.reply(":x: You must mention someone or give their ID!");
      if(user === message.author) {
        message.reply(":no_entry_sign: Why are you trying to thank yourself? Are you crazy? Get yo'self together!");
        return;
      }
    
    
      // Get their current points.
      let userscore = client.getScore.get(user.id, message.guild.id);
      // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
      if (!userscore) {
        userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
      }
      userscore.points += 50;
    
      // We also want to update their level (but we won't notify them if it changes)
      let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
      userscore.level = userLevel;
    
      // And we save it!
      client.setScore.run(userscore);
    
      return message.channel.send(`<@${user.id}> has received 50 points and now stands at ${userscore.points} points.`);

    }, // End Execute
    
  }; // End module.exports
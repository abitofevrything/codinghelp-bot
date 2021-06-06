const connection = require('../database.js');
const Discord = require('discord.js');
const cooldowns = new Map();

module.exports = {
    name: 'thanks',
    aliases: ['thnks', 'tks', 'tx', 'thank'],
    usage: '++thanks <@username or ID>',
    inHelp: 'yes',
    cooldown: 600,
    example: '++thanks @DudeThatsErin#8061 or ++thanks 455926927371534346',
    async execute(message, args) {
        const mention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));;
        const user = mention.id;

      if (!mention) {
        message.reply('Please tag a user to thank.');
        return;
      }
      if(user === message.author.id) {
        message.reply('You can\'t thank yourself. That is cheating.')
      } else {
        
        await connection.query(
          `INSERT INTO Thanks (guildId, user, thanks) VALUES (?, ?, ?);`,
          [message.guild.id, user, 1]
        );

        const results = await connection.query(
          `SELECT thanks, SUM(CAST(thanks AS UNSIGNED)) AS total FROM Thanks WHERE guildId = ? AND user = ?;`,
          [message.guild.id, user]
        );
        const no = results[0][0].total;
        message.reply(`You thanked ${mention.username}! They now have ${no} thanks. Use the \`++thanks-leaderboard\` command to see where you stand.`)
        
      }

    }
}
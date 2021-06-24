const connection = require('../database.js');

module.exports = {
    name: 'thanks',
    aliases: ['thnks', 'tks', 'tx', 'thank'],
    usage: '++thanks <@username or ID>',
    inHelp: 'yes',
    cooldown: 0,
    example: '++thanks @DudeThatsErin#8061 or ++thanks 455926927371534346',
    async execute(message, args, client) {
      const mention = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));;
      const user = mention.id;

    if (!mention) {
      message.reply('Please tag a user to thank.');
      return;
    }

    if(mention.user.bot === true || user === message.author.id || user === client.user.id) { 
      message.reply('It looks like you were trying to thank yourself or a bot in your server. That is not the appropriate way to use this system.');
    }
    else {
      
      const results = await (await connection).query(
        `SELECT thanks, SUM(CAST(thanks AS UNSIGNED)) AS total FROM Thanks WHERE guildId = ? AND user = ?;`,
        [message.guild.id, user]
      );
      const no = results[0][0].total;

    await (await connection).query(
      `INSERT INTO Thanks (guildId, user, thanks) VALUES (?, ?, ?);`,
      [message.guild.id, user, 1]
    );

    message.reply(`You thanked ${mention.user.username}! They now have ${no} thanks. Use the \`++thanks-leaderboard\` command to see where you stand.`)
    }

    }
}

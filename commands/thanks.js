const connection = require('../database.js');
const db = require('quick.db');
const talkedRecently = new Set();

module.exports = {
    name: 'thanks',
    aliases: ['thnks', 'tks', 'tx', 'thank'],
    usage: '++thanks [ping user]',
    async execute(message, args) {
        const mention = message.mentions.users.first()

        if (!mention) {
          message.reply('Please tag a user to thank.')
          return
        }
    
        let thank;
        const guildId = message.guild.id;
        const userId = mention.id;
    
        const Hour = 60 * 60 * 1000;
        const currentDate = new Date();
        let cooldown = 7200000; // 2 hours in ms

        let lastDaily = await db.fetch(`daily_${message.author.id}`);
      
        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
          // If user still has a cooldown
          let timeObj = ms(cooldown - (Date.now() - lastDaily)); // timeObj.hours = 2
          message.reply('You already thanked someone within the last 2 hours. Please wait more time before you thank someone again.')
      } else {
          // Otherwise they'll get their daily
          await connection.query(
            `UPDATE Thanks
            SET thanks = thanks + 1
            WHERE userId = ?;`,
            [userId]
          );
          message.reply(
            `Thanks for thanking ${mention}! They have been given 1 thank! You can only do this once every 2 hours.`
          );
        }
    }
}
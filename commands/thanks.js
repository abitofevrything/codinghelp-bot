const economy = require('./economy.js');

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
    
        const points = 20;
    
        const guildId = message.guild.id
        const userId = mention.id
    
        const newPoints = await economy.addPoints(guildId, userId, points)
    
        message.reply(
          `Thanks for thanking ${mention}! They have been given ${newPoints} more points! You can only do this once every 2 hours.`
        );
    }
}
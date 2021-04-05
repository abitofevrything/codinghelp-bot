const economy = require('./economy.js');

module.exports = {
    name: 'balance',
    aliases: ['bal'],
    usage: '++balance or ++balance [ping user]',
    async execute(message, args) {
        const target = message.mentions.users.first() || message.author;
        const guildId = message.guild.id;
        const userId = target.id;

        const points = await economy.getPoints(guildId, userId)
        message.reply(`That user has ${points} points!`);
    }
}
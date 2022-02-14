const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'unreview',
    aliases: ['unreviewed', 'notreviewed', 'noreview', 'not-reviewed', 'no-review'],
    challengeMods: 'yes',
    async execute(message, args, client) {

        let msgId = args[0];
        if (!msgId) return message.reply('You need to include the message ID for the message you want to remove points from.');
        const results = await connection.query(
            `SELECT * FROM Submissions WHERE msgId = ?;`,
            [msgId]
        );
        if (results[0][0]?.moderator == undefined || results[0][0]?.moderator == 0 || results[0][0]?.moderator == null) return message.reply('This message has not been reviewed yet. I can only mark submissions as unreviewed if they were already reviewed.');
        let player = results[0][0].author;
        let playerID = client.users.cache.get(player) || await message.client.users.fetch(player).catch(err => { console.log(err); });
        let playerName = playerID.username;

            connection.query(
                `UPDATE Submissions SET moderator = ?, points = ? WHERE msgId = ?;`,
                [0, 0, msgId]
            );
            message.channel.send({ content: `I have marked ${playerName}'s submission as unreviewed. They can now modify their submission if they need to.` });

    }
}
const Discord = require('discord.js');
const connection = require('../../database.js');
const embd = require('../../config/embed.json');

module.exports = {
    name: 'reviewed',
    aliases: ['mark', 'review'],
    challengeMods: 'yes',
    async execute (message, args, client) {
        let points = args[0];
        let msgId = args[1];
        let moderator = message.author.id;

            if (!points) {
                message.react('❓');
                message.channel.send('You need to tell me how many points to give the original author of this submission.');
                return;
            } else {
                if (!msgId) {
                    message.react('❓');
                    message.channel.send('You need to include the message ID for the submission you would like to review. Without this I will not know which message to review.');
                    return;
                } else {

                    const result = await connection.query(
                        `SELECT * FROM Submissions WHERE msgId = ?;`,
                        [msgId]
                    );
                    const m = result[0][0].moderator;
                    //message.reply(`this is \`\`\`m is \n${m}\`\`\``)
                    console.log(m)
                    
                    if (m == undefined || m == null || m == 0) {
                        //console.log(points);
                        //console.log(msgId);
                        connection.query(
                            `UPDATE Submissions SET points = ?, moderator = ? WHERE msgId = ?;`,
                            [points, moderator, msgId]
                        );
                        message.reply(`This submission has been reviewed.`)
                    }
                    else {
                        message.reply('This submission has already been reviewed. If you need to add more points to this user please use the \`++add-points\` command.');
                        return;
                    }
                }
            }

}
}
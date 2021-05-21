const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'reviewed',
    description: 'This gives **mods** the ability to review submissions.',
    aliases: ['mark', 'review'],
    usage: '++reviewed [challenge number] <number of points> [message ID]',
    example: '++reviewed 1 1 841143871689064448',
    inHelp: 'yes',
    async execute (message, args) {

        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
                let challengeNo = args[0];
                let points = args[1];
                let msgId = args[2];
                let moderator = message.author.id;

                if(!challengeNo) {
                    message.channel.send('You need to tell me what challenge number you would like to review.');
                    return;
                } else {
                    if(!points) {
                        message.channel.send('You need to tell me how many points to give the original author of this submission.');
                        return;
                    } else {
                        if(!msgId) {
                            message.channel.send('You need to include the message ID for the submission you would like to review. Without this I will not know which message to review.');
                            return;
                        } else {
                            connection.query(
                                `UPDATE Submissions SET moderator = ? WHERE msgId = ? AND guildId = ?;`,
                                [moderator, msgId, message.guild.id]
                            );
                            const result = await connection.query(
                                `SELECT Author FROM Submissions WHERE msgId = ? AND guildId = ?;`,
                                [msgId, message.guild.id]
                            );
                            let user = result[0][0].Author;
                            const Author = message.client.users.cache.get(user);
                            connection.query(
                                `INSERT INTO Points (guildId, user, points, dayNo) VALUES (?, ?, ?, ?);`,
                                [message.guild.id, user, points, challengeNo]
                            );

                            message.channel.send(`I have given ${Author} ${points} point(s) and marked that submission as reviewed! Thank you!`);
                        }
                    }
                }
        }    

    }
}
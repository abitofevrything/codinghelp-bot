const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'manual-add-user',
    description: 'This allows **mods** to manually add users to the participants database.',
    aliases: ['add-people', 'adduser', 'add-user', 'manualadd-user', 'manualadduser', 'mau'],
    usage: '++manual-add-user [user ID or ping]',
    inHelp:'yes',
    example: '++manual-add-user 839863262026924083',
    challengeMods: 'yes',
    async execute(message, args, client) {
        const g = message.guild.id;
        const mmbr = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => { });
        console.log(mmbr.id)
        const tag = mmbr.tag;
        if (!mmbr) {
            message.reply('You need to include a user ID or mention of the user you want to add to the database.');
        } else {
            const isAlreadyPlaying = await connection.query(
                `SELECT player FROM Challenges WHERE player = ? AND guildId = ?;`,
                [mmbr.id, message.guild.id]
            );
            if (!isAlreadyPlaying[0][0]?.player) {
                message.channel.send({ content: `I have added ${tag} to the database. 👍` });
                connection.query(
                    `INSERT INTO Challenges (guildId, player) VALUES (?, ?);`,
                    [message.guild.id, mmbr.id]
                );
            } else {
                message.react('❌');
                message.reply('That user has already been added to the database. I am not able to add them to the database again. If believe they are not in the database, please run the \`s.check-participants\` command. If you have confirmed they are not in the database with that command, please report this error to the dev using the \`s.report\` command.');
                return;
            }
        }

    }
}
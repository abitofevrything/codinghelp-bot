const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'denied-sugg',
    aliases: ['deniedsugg', 'denys', 'nosugg', 'deniedsuggestion', 'deniedsuggestions', 'denysugg'],
    inHelp: 'yes',
    description: 'Denies a specific suggestion. **Note:** This can only be ran by moderators.',
    usage: '++deniedsugg messageID [reason]',
    async execute(message, args) {

        const msgId = args[0];
        const result = await connection.query(
            `SELECT noSugg from Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const mId = result[0][0].noSugg;

        const result2 = await connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const OGauthor = result2[0][0].Author;
        const aut = OGauthor.tag;

        const result3 = await connection.query(
            `SELECT Message from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const suggestion = result3[0][0].Message;

        const result4 = await connection.query(
            `SELECT Avatar from Suggs WHERE noSugg = ?;`,
            [msgId],
        );
        const avatar = result4[0][0].Avatar;

        const mod = message.author.tag;

        const stats = args.slice(1).join(' ');
        if(!stats) return message.channel.send('You need to include the status of the suggestion as well as the message ID.');

        connection.query(
            `UPDATE Suggs SET stat = ?, Moderator = ? WHERE noSugg = ?;`,
            [stats, mod, msgId],
        );

        const result8 = await connection.query(
            `SELECT stat FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const upStatus = result8[0][0].stat;

        const moderator = await connection.query(
            `SELECT Moderator FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const moder = moderator[0][0].Moderator;
        const moderate = moder.tag;
        
        const denied = new Discord.MessageEmbed()
            .setColor('1C3D77')
            .setAuthor(`${aut}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'Unfortunately, your suggestion was denied. This is the reason:', value: `${upStatus}`},
                { name: 'Moderator that denied your suggestion:', value: `${moderate}`},
            )
            .setTimestamp()
            .setFooter('If you do\'t understand this reason, please contact the moderator that updated your suggestion. Thank you!');
            message.client.users.cache.get(`${OGauthor}`).send(updated);
                message.delete()
        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
            channel.messages.fetch(mId).then(message => {
                    message.delete();
                }
            )
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }

};
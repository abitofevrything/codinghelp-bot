const Discord = require('discord.js');
let connection = require('../database.js');

module.exports = {
    name: 'progresssugg',
    aliases: ['inprogsugg', 'workingsugg', 'workingsuggestion', 'inprogresssuggestion', 'inprogresssuggestions', 'workingsuggestion', 'worksugg', 'ps', 'ws'],
    inHelp: 'yes',
    description: 'Marks a specific suggestion as in progress with the current status. **Note:** This can only be ran by moderators.',
    usage: '++progresssugg messageID [status message]',
    category: 'Messages',
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
        const author = result2[0][0].Author;

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
            `UPDATE Suggs SET test = ?, Moderator = ? WHERE noSugg = ?;`,
            [stats, mod, msgId],
        );

        const result8 = await connection.query(
            `SELECT test FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const upStatus = result8[0][0].test;

        const moderator = await connection.query(
            `SELECT Moderator FROM Suggs WHERE noSugg = ?;`,
            [msgId]
        );
        const moder = moderator[0][0].Moderator;

        const inprogress = new Discord.MessageEmbed()
            .setColor('004d4d')
            .setAuthor(`${author}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'Current Status', value: `${upStatus}`},
                { name: 'The moderator that last updated this was', value: `${moder}`},
            )
            .setFooter('If you would like to suggest something, use \`++suggestions\`');
            
        const updated = new Discord.MessageEmbed()
            .setColor('1C3D77')
            .setAuthor(`${author}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'Your suggestion has been updated! This is the current status:', value: `${upStatus}`},
                { name: 'Moderator that updated your suggestion:', value: `${mod}`},
            )
            .setTimestamp()
            .setFooter('If you do\'t understand this status, please contact the moderator that updated your suggestion. Thank you!');
            message.author.send(updated);

            message.delete();
        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
            channel.messages.fetch(mId).then(message => {
                    if(message) message.edit(inprogress);

                }
            )
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};
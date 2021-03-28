const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'prog-sugg',
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
        const OGauthor = result2[0][0].Author;
        let name = message.client.guilds.cache.get(message.guild.id).members.cache.get(`${OGauthor}`).displayName;
        console.log(name);

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

        const mod = message.author.id;

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
        const moderate = message.client.guilds.cache.get(message.guild.id).members.cache.get(`${moder}`).displayName;

        const inprogress = new Discord.MessageEmbed()
            .setColor('004d4d')
            .setAuthor(`${name}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'Current Status', value: `${upStatus}`},
                { name: 'The moderator that last updated this was', value: `${moderate}`},
            )
            .setFooter('If you would like to suggest something, use \`++suggestions\`');
            
        const updated = new Discord.MessageEmbed()
            .setColor('1C3D77')
            .setAuthor(`${name}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'Your suggestion has been updated! This is the current status:', value: `${upStatus}`},
                { name: 'Moderator that updated your suggestion:', value: `${moder}`},
            )
            .setTimestamp()
            .setFooter('If you do\'t understand this status, please contact the moderator that updated your suggestion. Thank you!');
            message.client.users.cache.find(user => user.displayName== `${name}`).send()

            message.delete();
        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
            channel.messages.fetch(mId).then(message => {
                    if(message) message.edit(inprogress);
                }
            ).catch(console.error);
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};
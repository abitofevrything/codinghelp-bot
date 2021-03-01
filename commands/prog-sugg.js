const Discord = require('discord.js');
let connection = require('../database.js');

module.exports = {
    name: 'progresssugg',
    aliases: ['inprogsugg', 'workingsugg', 'workingsuggestion', 'inprogresssuggestion', 'inprogresssuggestions', 'workingsuggestion', 'worksugg', 'ps', 'ws'],
    inHelp: 'yes',
    description: 'Marks a specific suggestion as in progress with the current status. **Note:** This can only be ran by moderators.',
    usage: '++progresssugg messageID [status message]',
    category: 'Messages',
    execute(message, args) {

        const msgId = args[0];
        console.log(msgId);

        const status = args.slice(1).join(' ');
        console.log('status: ' + status);


        let mId;
        connection.query(
            `SELECT noSugg from Suggs WHERE noSugg = ?;`,
            [msgId]
        ).then(result => {
            mId = result[0][0];
            console.log(mId);
        }).catch(err => console.log(err));

        if(!mId) return message.channel.send('You need to specificy a suggestion with the message ID!');

        const author = connection.query(
            `SELECT Author from Suggs WHERE noSugg = ?;`,
            [msgId],
            function(err, results) {
                console.log(results);
            }
        );
        const suggestion = connection.query(
            `SELECT Message from Suggs WHERE noSugg = ?;`,
            [msgId],
            function(err, results) {
                console.log(results);
            }
        );
        const avatar = connection.query(
            `SELECT Avatar from Suggs WHERE noSugg = ?;`,
            [msgId],
            function(err, results) {
                console.log(results);
            }
        );

        if(!status) return message.channel.send('You need to include the status of the suggestion as well as the message ID.');
        console.log(`ID: ${mId}, ID: ${msgId}, Author: ${author}, Sugg: ${suggestion}, Avatar: ${avatar}, Status: ${status}`);

        try {
            connection.query(
                `UPDATE Suggs Set STATUS = '?' WHERE noSugg = ?;`,
                [status, msgId],
            ).then(result => {
                console.log(result);
            }).catch(err => console.log(err));
        } catch(err) {
            console.log(err);
        }
        const inprogress = new Discord.MessageEmbed()
            .setColor('004d4d')
            .setAuthor(`${author}`, `${avatar}`)
            .setDescription(`${suggestion}`)
            .addFields(
                { name: 'This suggestion is being implemented.', value: `${status}`},
            )
            .setFooter('If you would like to suggest something, use \`++suggestions\`');

        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const newMessage = message.channel.send(inprogress);
           // message.delete();
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};
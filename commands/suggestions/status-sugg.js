const Discord = require('discord.js');
let connection = require('../database.js');

module.exports = {
    name: 'statussugg',
    aliases: ['statuss', 'ss', 'ssugg', 'supsugg', 'hmsug'],
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
        
        const result5 = await connection.query(
            `SELECT LAST_EDITED from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        const date = result5[0][0].LAST_EDITED;

        const result6 = await connection.query(
            `SELECT Moderator from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        let mod = 'No one has updated this suggestion yet.';
        if (result6[0][0].Moderator) {
            mod = result6[0][0].Moderator;
        }

        const result7 = await connection.query(
            `SELECT test from Suggs WHERE noSugg = ?`,
            [msgId],
        );
        const status = result7[0][0].test;

        const initial = new Discord.MessageEmbed()
        .setColor('771C73')
        .setAuthor(`${author}`, `${avatar}`)
        .setDescription(`${suggestion}`)
        .addFields(
            {name: 'Last Edited on', value: `${date}\nYou can convert the time by using [this time converter](https://greenwichmeantime.com/time-gadgets/time-zone-converter/).`},
            {name: 'Moderator that edited your message last?', value: `${mod}`},
            {name: 'Status Message', value: `${status}`}
        )
        .setTimestamp()
        .setFooter('This is the current status of this suggestion. If you are curious about this status, please contact the mods to see what we are waiting on.');

        let user = message.author;
        user.send(initial);
        message.delete()
        }
    };
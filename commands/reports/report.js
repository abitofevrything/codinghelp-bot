const connection = require('../../database.js');
const bot = require('../../config/bot.json');
const me = require('../../config/owner.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'report',
    description: 'You can report problems with r/CodingHelp to the developers so that they can fix it.',
    aliases: ['reports', 'err', 'error', 'issue', 'issues'],
    inHelp: 'yes',
    usage: '++report <report>',
    example: '++report The bot is broken!',
    async execute(message, args, client) {
        let author = message.author.id;
        let usr = message.guild.members.cache.get(author);
        let messageId = message.id;
        let description = args.slice(0).join(' ');
        if (!description && !message.attachments.first()) return message.reply('Please tell me what you would like to report. You can upload a file but please use words as well. A file alone does not tell me very much at all.')
        const channel = client.channels.cache.find(channel => channel.id === bot.reportsChId);
        let authorUsername = message.author.username;
        let avatar = message.author.displayAvatarURL({ dynamic: true });
        const url = message.attachments.first()?.url || 'No';

        const report = {
            color: '#8C1149',
            title: 'Oops! A *bug* has appeared!',
            author: {
                name: authorUsername,
                icon_url: avatar
            },
            description: `**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`,
            timestamp: new Date(),
            footer: {
                text: 'This was all of the info I could grab from the report.',
                icon_url: bot.avatar
            }
        };

        let report2 = new MessageEmbed()
            .setColor('#11818C')
            .setTitle(`Your report has been sent to ${me.name} aka ${me.username}!`)
            .setAuthor({name: authorUsername, iconURL: avatar})
            .setThumbnail(avatar)
            .setDescription(`**This is the report:**\n${description}\n\n**Any files uploaded?**\n${url}`)
            .setTimestamp()
            .setFooter({ text: 'This was all of the information I could grab from the report.', iconURL: bot.avatar});

        const msg = await channel.send({ embeds: [report] });

        message.react('✅');
        const reportNo = msg.id;
        report2.addField('Message ID', `\`${reportNo}\``);
        report2.addField('Please save this message ID. Use the following command to check the status of the report in the future:', `\`++statusreport ${reportNo}\``);
        await connection.query(
            `INSERT INTO reports (messageId, authorId, avatar, description, file) VALUES(?, ?, ?, ?, ?);`,
            [reportNo, author, avatar, description, url]
        );

        usr.send({ embeds: [report2] })
    }
}
const connection = require('../../database.js');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'report',
    description: 'You can report problems with r/CodingHelp to the developers so that they can fix it.',
    aliases: ['reports', 'err', 'error', 'issue', 'issues'],
    inHelp: 'yes',
    usage: '++report <report>',
    example: '++report The bot is broken!',
    permissions: '',
    async execute(message, args, client) {
        let author = message.author.id;
        let usr = message.guild.members.cache.get(author);
        let messageId = message.id;
        let description = args.slice(0).join(' ');
        if (!description && !message.attachments.first()) return message.reply('Please tell me what you would like to report. You can upload a file but please use words as well. A file alone does not tell me very much at all.')
        const channel = client.channels.cache.find(channel => channel.id === config.bot.reportsChId);
        let authorUsername = message.author.username;
        let avatar = message.author.displayAvatarURL({
            dynamic: true
        });

        const url = 'no' || message.attachments.first().url;

        let report2 = new Discord.MessageEmbed()
            .setColor('#5241CE')
            .setTitle(`WE HAVE A BUG!`)
            .setAuthor(`${authorUsername}`)
            .setThumbnail(`${avatar}`)
            .setDescription(`**This is the report:**\n\n${description}\n\n**Any files uploaded?**\n${url}`)
            .addFields(
                { name: 'Message ID:', value: `\`${messageId}\`` },
                { name: 'Message Author ID:', value: `\`${author}\`` }
            )
            .setTimestamp()
            .setFooter('This was all of the information I could grab from the report.', 'https://codinghelp.site/bots/codinghelp.png')

        await channel.send(report2);

        message.react('✅');

        usr.send(`I have sent your report to ${config.bot.devName}! Thank you! Please save this message ID as you can use it to check the status of this report in the future: \`${messageId}\`.\nTo check the status you can copy and paste this:\n\`++statusreport ${messageId}\``)

        await connection.query(
            `INSERT INTO reports (messageId, authorId, avatar, description, file) VALUES(?, ?, ?, ?, ?);`,
            [messageId, author, avatar, description, url]
        );
    }
}
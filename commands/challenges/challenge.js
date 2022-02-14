const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'challenge',
    description: 'This command allows **mods** to add additional challenge questions to the Challenge System.',
    aliases: ['new-challenge', 'chall', 'c'],
    usage: '++challenge [challenge number] [question]',
    inHelp: 'yes',
    example: '++challenge 1 What is my favorite color?',
    challengeMods: 'yes',
    async execute (message, args, client) {

        let msgId = message.id;
        let guildId = message.guild.id;
        let challengeNo = args[0];
        let answer = args.slice(1).join(' ');
        let moderator = message.author.id;

        const result = await connection.query(
            `SELECT * FROM Challenge WHERE guildId = ?;`,
            [guildId]
        );
        const announcementsChannel = result[0][0].channelD;
        if (!result) return message.channel.send('The challenge has not started yet. Please start the challenge first with \`++start-challenge [announcements channel] Prize1|Prize2|Prize3\` before running this.');

        if (!challengeNo) {
                const challenge = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? ORDER BY challengeNo DESC LIMIT 1;`,
                    [guildId]
                );
            const challengeNo = challenge[0][0].challengeNo || '\`0 zilch nada, there isn\'t a challenge in the database.\`';
            message.react('❓');
                message.reply(`What challenge number are you trying to add to the database? The last challenge number in the database is ${challengeNo}.`);
                return;
        } else {
            if (!answer) {
                message.react('❓');
                message.reply('What is the challenge that you want to submit? You can\'t submit a blank challenge.');
                return;
            } else {
                let ch = client.channels.cache.get(announcementsChannel) || await client.channels.fetch(announcementsChannel).catch(console.log(err))

                let embeD = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`Challenge ${challengeNo}`)
                    .setDescription(`${answer}`)
                    .setFooter({ text: 'Run the ++submit command to submit answers to this challenge.' });


                const s = await ch.send({ content: `Hey, <@&805104969442263070> A new challenge is up!`, embeds: [embeD] })
                //console.log(s);
                //console.log(s.id);
                const msg = s.id;
                connection.query(
                    `INSERT INTO Challenge (msgId, guildId, title, challengeNo, moderator) VALUES (?, ?, ?, ?, ?);`,
                    [msg, guildId, answer, challengeNo, moderator]
                );

                const results = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? AND challengeNo = ?;`,
                    [guildId, challengeNo]
                );
                const res = results[0][0];
                const mes = res.msgId;
                let embed = new Discord.MessageEmbed()
                    .setColor('#92caa0')
                    .setTitle(`I have added Challenge number ${challengeNo} to the \`Challenge\` Database.`)
                    .setDescription(`The submission is as follows: ${answer} You can see it here: <#${announcementsChannel}>.\n\nThe message ID for the challenge is: \`${mes}\``)
                    .setFooter({ text: 'If this is in error, please report this!' });

                message.channel.send({ embeds: [embed] })
                message.delete();
                }
            }


    }
}
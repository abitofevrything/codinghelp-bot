const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'mod-check-submissions',
    description: 'This allows **mods** to check who has submitted a response.',
    aliases: ['mcs', 'mcksubs', 'mck-subs', 'modchecksubmissions'],
    usage: '++mod-check-submissions [challenge number]',
    example: '++mod-check-submissions 1',
    inHelp: 'yes',
    challengeMods: 'yes',
    async execute (message, args, client) {
        let a = message.author.id;
        let nameSend = client.users.cache.get(a) || await client.users.fetch(a).catch(() => { })
        let challengeNo = args[0];

        if (!challengeNo) {
            message.react('❓');
                message.channel.send('Please include the challenge number you want to check the submissions for. Thank you!');
                return;
            } else {
                const result2 = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? AND challengeNo = ?;`,
                    [message.guild.id, challengeNo]
                );
                const number = result2[0][0].challengeNo;
                const question = result2[0][0].title;
                let embed = new Discord.MessageEmbed()
                    .setColor('#3fa066')
                    .setTitle(`This is the question that was asked during Challenge ${number}`)
                    .setDescription(`${question}`)
                    .setFooter('If this is not right, please report it!');
                    message.channel.send(`📨 I have sent you a private message!`)
                nameSend.send({ embeds: [embed] });

                const result = await connection.query(
                    `SELECT * FROM Submissions WHERE guildId = ? AND challengeNo = ?;`,
                    [message.guild.id, challengeNo]
                );

                for (const row of result[0]){
                    const Members = row.author;
                    const Author = client.users.cache.get(Members) || await message.client.users.fetch(Members).catch(err => {console.log(err);});
                    const username = Author.username;
                    const Submissions = row.message || 'no message included with this submission.';
                    const dayNo = row.challengeNo;
                    const moderator = row.moderator;
                    const msgId = row.msgId;
                    const attachment = row.file || 'no attachment included with this submission';

                    if(moderator === '0') {
                            // notDefined Embed
                            const notDefined = new Discord.MessageEmbed()
                                .setColor('#3e5366')
                                .setTitle(`The submission by ${username} for Challenge ${dayNo} has not been reviewed yet.`)
                                .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\``)
                                .setFooter({ text: 'If there is a problem with this, please report this!' });
                            nameSend.send({ embeds: [notDefined] });
                    } else {
                        const modname = await message.client.users.fetch(moderator).catch(err => { console.log(err); });
                        // Defined Embed
                        const defined = new Discord.MessageEmbed()
                            .setColor('#d4a066')
                            .setTitle(`The submission by ${username} for Challenge ${dayNo} has been reviewed.`)
                            .setDescription(`Their submission is as follows:\n${Submissions}\n\nThey had this attachment:\n${attachment}\n\nTheir message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                            .setFooter({ text: 'If there is a problem with this, please report this!' });
                        nameSend.send({ embeds: [defined] });
                    }
                  }
                }
                }
}
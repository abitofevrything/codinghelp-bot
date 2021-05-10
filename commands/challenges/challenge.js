const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'challenge',
    description: 'This command allows **mods** to add additional challenge questions to the Challenge System.',
    aliases: ['new-challenge', 'chall', 'c'],
    usage: '!challenge [challenge number] [question]',
    async execute (message, args) {
        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
        let msgId = message.id;
        let guildId = message.guild.id;
        let dayNo = args[0];
        let answer = args.slice(1).join(' ');
        let moderator = message.author.id;

        const result = await connection.query(
            `SELECT * FROM Challenge WHERE guildId = ?;`,
            [guildId]
        );
        const announcementsChannel = result[0][0].channelD;


        if (!dayNo) {
                const challenge = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? ORDER BY dayNo DESC LIMIT 1;`,
                    [guildId]
                );
                const challengeNo = challenge[0][0].dayNo;
                message.reply(`What challenge number are you trying to add to the database? The last challenge number in the database is ${challengeNo}.`);
                return;
        } else {
            if(!answer) {
                message.reply('What is the challenge that you want to submit? You can\'t submit a blank challenge.');
                return;
            } else {

                let embeD = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`Challenge ${dayNo}`)
                    .setDescription(`${answer}`)
                    .setFooter('Run the ++submit command to submit answers to this challenge.');


                message.guild.channels.cache.get(announcementsChannel).send(embeD).then(message => {
                    const msg = message.id;
                    connection.query(
                        `INSERT INTO Challenge (guildId, msgId, moderator, title, dayNo) VALUES (?, ?, ?, ?, ?)`,
                        [guildId, msg, moderator, answer, dayNo]
                    );
                });
                const results = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? AND dayNo = ?;`,
                    [guildId, dayNo]
                );
                const mes = results.msgId;
                let embed = new Discord.MessageEmbed()
                .setColor('#92caa0')
                .setTitle(`I have added Challenge number ${dayNo} to the \`Challenge\` Database.`)                        
                .setDescription(`The submission is as follows: ${answer} You can see it here: <#${announcementsChannel}>.\n\nThe message ID for the challenge is: \`${mes}\``)
                .setFooter('If this is in error, please report this!');

            message.channel.send(embed)
                message.delete();
                }
            }


        }

    }
}
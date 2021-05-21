const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'check-submissions',
    description: 'This allows **mods** to check who has submitted a response.',
    aliases: ['cs', 'cksubs', 'ck-subs', 'checksubmissions'],
    usage: '++check-submissions [challenge number]',
    example: '++check-submissions 1',
    inHelp: 'yes',
    async execute (message, args) {
        let name = message.author.id;

        let challengeNo = args[0];
        let role = message.member.roles.cache.has('839863262026924083') || !message.member.roles.cache.has('718253309101867008');
        if(!role){ 
            message.channel.send('You do not have permission to run this command. Only moderators can run this command!');
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
            if(!challengeNo) {
                message.channel.send('Please include the challenge number you want to check the submissions for. Thank you!');
                return;
            } else {
                const result2 = await connection.query(
                    `SELECT * FROM Challenge WHERE guildId = ? AND dayNo = ?;`,
                    [message.guild.id, challengeNo]
                );
                const number = result2[0][0].dayNo;
                const question = result2[0][0].title;
                let embed = new Discord.MessageEmbed()
                    .setColor('#3fa066')
                    .setTitle(`This is the question that was asked during Challenge ${number}`)
                    .setDescription(`${question}`)
                    .setFooter('If this is not right, please report it!');
                    message.channel.send(`📨 I have sent you a private message!`)
                    message.client.users.cache.get(`${name}`).send(embed);

                const result = await connection.query(
                    `SELECT * FROM Submissions WHERE guildId = ? AND dayNo = ?;`,
                    [message.guild.id, challengeNo]
                );

                for (const row of result[0]){
                    const Members = row.Author;
                    const Author = await message.client.users.fetch(Members).catch(err => {console.log(err);});
                    const username = Author.username;
                    const Submissions = row.Message;
                    const dayNo = row.dayNo;
                    const moderator = row.moderator;
                    const msgId = row.msgId;
                    const modname = await message.client.users.fetch(moderator).catch(err => {console.log(err);});
                    
                    
                    // notDefined Embed
                    const notDefined = new Discord.MessageEmbed()
                        .setColor('#3e5366')
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has not been reviewed yet.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nTheir message ID is as follows: \`${msgId}\``)
                        .setFooter('If there is a problem with this, please report this!');

                    // Defined Embed
                    const defined = new Discord.MessageEmbed()
                        .setColor('#d4a066')
                        .setTitle(`The submission by ${username} for Challenge ${dayNo} has been reviewed.`)
                        .setDescription(`Their submission is as follows:\n${Submissions}\n\nTheir message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                        .setFooter('If there is a problem with this, please report this!');

                    if(moderator) {
                        message.client.users.cache.get(`${name}`).send(defined);
                    } else {
                        message.client.users.cache.get(`${name}`).send(notDefined);
                    }
                  }
                }
                }
                }
}
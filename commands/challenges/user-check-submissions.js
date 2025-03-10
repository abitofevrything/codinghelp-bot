const Discord = require('discord.js');
const connection = require('../../database.js');


module.exports = {
    name: 'user-check-submissions',
    description: 'This allows users to check see what submissions that they have made and provides them with their message ID.',
    aliases: ['ucs', 'ucksubs', 'uck-subs', 'userchecksubmissions'],
    usage: '++user-check-submissions',
    example: '++user-check-submissions',
    inHelp: 'yes',
    async execute (message, args) {
        let name = message.author.id;

        const result = await connection.query(
            `SELECT * FROM Submissions WHERE guildId = ? AND author = ?;`,
            [message.guild.id, name]
        );

        for (const row of result[0]){
            const Submissions = row.message || 'No message included with this submission.';
            const dayNo = row.challengeNo;
            const moderator = row.moderator;
            const msgId = row.msgId;
            const modname = await message.client.users.fetch(moderator).catch(err => { console.log(err); });
            const attachment = row.file || 'No attachment included for this submission';
                    
                    
            // notDefined Embed
            const notDefined = new Discord.MessageEmbed()
                .setColor('#3e5366')
                .setTitle(`The submission for Challenge ${dayNo} has not been reviewed yet.`)
                .setDescription(`The submission is as follows:\n${Submissions}\n\nYou had this attachment:${attachment}\n\nThe message ID is as follows: \`${msgId}\``)
                .setFooter('If there is a problem with this, please report this!');

            // Defined Embed
            const defined = new Discord.MessageEmbed()
                .setColor('#d4a066')
                .setTitle(`The submission for Challenge ${dayNo} has been reviewed.`)
                .setDescription(`The submission is as follows:\n${Submissions}\n\nYou had this attachment:\n${attachment}\n\nThe message ID is as follows: \`${msgId}\`\n\nThe moderator that reviewed it was: ${modname}.`)
                .setFooter('If there is a problem with this, please report this!');

            if(moderator === '0') {
                message.client.users.cache.get(`${name}`).send({ embeds: [notDefined] });
            } else {
                message.client.users.cache.get(`${name}`).send({ embeds: [defined] });
            }
        }
    }
}
const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'end-challenge',
    description: 'This gives **mods** the ability to end the challenge that was just being played.',
    aliases: ['endchallenge', 'echallenge', 'exitchallenge', 'exitc', 'over'],
    usage: '++end-challenge',
    example: '++end-challenge',
    inHelp: 'yes',
    async execute (message, args) {
        let userNames = '';
        let points = '';
        if(!message.member.hasPermission("MANAGE_MESSAGES") ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {

            const result = await connection.query(
                `SELECT * FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            const announcementsChannel = result[0][0].channelD;

            const embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('This challenge has ended!')
            .setDescription('Thank you for all of your submissions! Winners will get their prizes soon! Congratulations!')
            .addFields(
                {name: 'Top 10', value: userNames, inline: true},
                {name: 'Points', value: points, inline: true},
            )
            .setFooter('If this is wrong, please report this!');

            const leaderboard = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('These are the top 10 people in our challenge.')
                .setDescription('Please issue their winnings ASAP.')
                .addFields(
                    {name: 'Top 10', value: userNames, inline: true},
                    {name: 'Points', value: points, inline: true},
                )
                .setFooter('If this is wrong, please report this!');

            message.guild.channels.cache.get(announcementsChannel).send(embed);
            
            connection.query(
                `DELETE FROM Challenge WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Points WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Challenges WHERE guildId = ?;`,
                [message.guild.id]
            );
            connection.query(
                `DELETE FROM Submissions WHERE guildId = ?;`,
                [message.guild.id]
            );


            const top10 = await connection.query(
                `SELECT * FROM Points WHERE guildId = ? ORDER BY points DESC LIMIT 10;`, 
                [message.guild.id]
            );    
    
                for (let i = 0; i < top10.length; i++) {
                    const data = top10[0];
                    const user = data[i].user;
                    let membr = await message.client.users.fetch(user).catch(err => {console.log(err);});
                    let username = membr.username;
    
                    userNames += `${i + 1}. ${username}\n`;
                    points += `${data[i].points.toLocaleString('en')}\n`;
                }
            message.channel.send(leaderboard);
            message.reply('I have deleted everything from the databases and ended the challenge for you!')

        }
    }
}
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
        let role = message.member.roles.cache.has('839863262026924083') || message.member.roles.cache.has('718253309101867008') || message.member.roles.cache.has('846074806788685836');
        if(!role){ 
            message.channel.send('You don\'t have the `Challenge Mods` role so you can\'t use this command.');
            return;
        } else {
            
            connection.query(
                `DELETE FROM Challenge WHERE guildId = ?;`,
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

            message.reply('I have deleted everything from the databases and ended the challenge for you!')

        }
    }
}
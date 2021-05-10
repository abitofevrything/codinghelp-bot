const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'check-participants',
    description: 'This allows **mods** to check who has the participants role in their server.',
    aliases: ['cp', 'contestants', 'challenge-users', 'check-users'],
    usage: '!check-participants',
    async execute (message, args) {
        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
                const result = await connection.query(
                    `SELECT * FROM Challenges WHERE guildId = ?`,
                    [message.guild.id]
                );
                    message.channel.send('These are the members with the \`Participants\` role in the \`Challenges\` Database. If something is wrong here, please report it!');
                for (const row of result[0]){
                    const Members = row.player;
                    const name = await message.guild.members.cache.find(members => members.id == `${Members}`);
                    const tag = name.user.tag;
                    message.channel.send(`${tag}`)
                  }

                }
                }
}
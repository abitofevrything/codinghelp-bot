const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'remove-points',
    description: 'This gives **mods** the ability to remove points from users.',
    aliases: ['delete-points', 'deletepoints', 'removepoints', 'dp', 'rp'],
    usage: '++remove-points [message ID]',
    example: '++remove-points 841330343641874532',
    inHelp: 'yes',
    async execute (message, args) {

        let msgId = args[0];
        let author = message.author.username;
        let name = message.author.id;

        if(!msgId){ 
            message.channel.send('You need to include the submission\'s message ID of the submission you want to remove points from.');
            return;
        } else {
                
                let embed = new Discord.MessageEmbed()
                    .setColor('#c9a066')
                    .setTitle(`I have removed ${points} points from ${player}!`)
                    .setDescription(`Thank you for that, ${author}!`)
                    .setFooter('If there is a problem with this, please report it!');
                
                connection.query(
                    `UPDATE Points SET mod = ? WHERE msgId =?;`,
                    [NULL, msgId]
                );
                message.client.users.cache.get(`${name}`).send(embed);
                message.channel.send('📨 I have sent you a private message.')
            
        }


    }
}
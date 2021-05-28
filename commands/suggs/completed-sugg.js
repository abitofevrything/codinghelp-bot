const Discord = require('discord.js')
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'completedsugg',
    aliases: ['cs', 'dones', 'donesugg', 'completedsuggestion', 'completedsuggestions', 'acceptedsugg', 'acceptedsuggestions', 'acceptedsuggestion', 'oksugg', 'oks'],
    inHelp: 'yes',
    description: 'Allows **mods** to mark suggestions as completed.',
    usage: '++completedsugg messageID [reason]',
    example: '++completedsugg 436043273069658112 I like pudding, too.',
    async execute(message, args) {
        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
            const msgId = args[0];
            if(msgId > 0 ) {
                try {
                    const result = await connection.query(
                        `SELECT noSugg from Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const mId = result[0][0].noSugg;
                } catch(error) {
                    message.reply('There was an error grabbing the ID from the database. Please report this!');
                    console.log(error);
                }

                const result2 = await connection.query(
                    `SELECT Author from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const OGauthor = result2[0][0].Author;
                const aut = (await message.client.users.cache.get(`${OGauthor}`)).username;

                    const result3 = await connection.query(
                        `SELECT Message from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const suggestion = result3[0][0].Message;

                    const result4 = await connection.query(
                        `SELECT Avatar from Suggs WHERE noSugg = ?;`,
                        [msgId],
                    );
                    const avatar = result4[0][0].Avatar;

    
                mod = message.author.id;
    
                const stats = args.slice(1).join(' ');
                if(!stats) return message.channel.send('You need to include the completion status message for this suggestion as well as the message ID.');
    
                try {
                    connection.query(
                        `UPDATE Suggs SET stat = ?, Moderator = ? WHERE noSugg = ?;`,
                        [stats, mod, msgId],
                    );
                } catch (error) {
                    message.reply('There was an error updating the suggestion in the database. Please report this!');
                    console.log(error);
                }
    

                    const result8 = await connection.query(
                        `SELECT stat FROM Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const upStatus = result8[0][0].stat;

                    const moderator = await connection.query(
                        `SELECT Moderator FROM Suggs WHERE noSugg = ?;`,
                        [msgId]
                    );
                    const moder = moderator[0][0].Moderator;
                    const moderate = moder.username || message.author.username;

            
                const denied = new Discord.MessageEmbed()
                    .setColor('6E3EA4')
                    .setAuthor(`${aut}`, `${avatar}`)
                    .setDescription(`${suggestion}`)
                    .addFields(
                        { name: 'Your suggestion was completed! This is the decision:', value: `${upStatus}`},
                        { name: 'Moderator that completed your suggestion:', value: `${moderate}`},
                    )
                    .setTimestamp()
                    .setFooter('If you don\'t understand this decision, please contact the moderator that completed your suggestion. Thank you!');
    
            
                    (await message.client.users.cache.get(`${OGauthor}`)).send(denied);
                    message.delete();
                    message.channel.send(`I have updated the suggestion for you, <@${moder}>, and sent a message to <@${OGauthor}>. I have also deleted the message with the ID of ${msgId} from the #suggestions channel. I hope this resolves everything for you!`);

                    try {
                        await connection.query(
                            `DELETE FROM Suggs WHERE noSugg = ? AND Author = ?;`,
                            [msgId, OGauthor],
                        );
                    } catch (error) {
                        message.reply('There was an error deleting the suggestion from the database. Please report this!');
                        console.log(error);
                    }
        
    
                    const chnnel = await message.guild.channels.cache.find(c => c.name === 'suggestions');
                    chnnel.messages.fetch(msgId).then(message => {
                        message.delete(); 
                    });
            } else {
                message.reply('You need to include the ID of the message you want to mark as completed.')
            }
        } else {
            message.reply('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};
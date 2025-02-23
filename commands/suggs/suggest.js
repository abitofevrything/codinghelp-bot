const Discord = require('discord.js');
const connection = require('../../database.js');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg', 's'],
    description: 'Creates a suggestion!',
    usage: '++suggestions [suggestion here]',
    example: '++suggestions I want pudding!',
    inHelp: 'yes',
    async execute(message, args){
        const threadAuthor = message.member.displayName;

    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) {
        message.guild.channels.create('suggestions', {
            type: 'text',
            reason: 'CodingHelp Bot needed a suggestions channel for the suggestions handler.'
        }).then((channel) => {
            message.channel.send({text:'The suggestions channel did not exist so I created one!'})
        }).catch(console.error);

        let messageArgs = '';
        if (args.length > 0) {
            messageArgs = args.join(' ');
        } else {
            message.react('❓');
            message.reply({text:'You need to specify a suggestion to use this command. How will we know what you want to suggest unless you tell us?! If you would like to check the status of your suggestion then you can use \`++statussug [your status message ID]\`.'});
            return;
        }
        let newStatus = 'New Suggestion';
        let author = message.author.id || 'default value';
        let name = message.author.tag;
        let avatar = message.author.displayAvatarURL({ dynamic: true});
    
        const initial = new Discord.MessageEmbed()
        .setColor('FADF2E')
        .setAuthor({name: name, iconURL: avatar})
        .setDescription(messageArgs)
        .setFooter({text: '📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit #discussions and discuss it there.'});
    
        message.client.users.cache.get(author).send({text: `Hey, ${message.author.username}! Thanks for submitting a suggestion! Our server needs to have time to vote on this. Once some time has passed, you can check the suggestion channel to check the updated status of your suggestion! We appreciate your feedback! Happy chatting!`});
    
        await channel.send(initial).then(function(message) {
            message.react('👍');
            message.react('👎');
            message.startThread({
                name: messageArgs,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            }); 
        });
        const suggNo = msg.id;
    
        try {
            (await connection).query(
                `INSERT INTO Suggs (noSugg, Author, Message, Avatar, stat) VALUES(?, ?, ?, ?, ?)`,
                [suggNo, author, messageArgs, avatar, newStatus]
            );
    
        } catch(err) {
            console.log(err);
        }
    } else {
        let messageArgs = '';
        if (args.length > 0) {
            messageArgs = args.join(' ');
        } else {
            message.react('❓');
            message.reply({text: 'You need to specify a suggestion to use this command. How will we know what you want to suggest unless you tell us?! If you would like to check the status of your suggestion then you can use \`++statussug [your status message ID]\`.'});
            return;
        }
        let newStatus = 'New Suggestion';
        let author = message.author.id || 'default value';
        let name = message.author.tag;
        let avatar = message.author.displayAvatarURL({ dynamic: true});
    
        const initial = new Discord.MessageEmbed()
        .setColor('#FADF2E')
        .setAuthor({name: name, iconURL: avatar})
        .setDescription(messageArgs)
        .setFooter({text: '📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit #discussions and discuss it there.'});
    
        await channel.send({ embeds: [initial] }).then(function(message) {
            message.react('👍');
            message.react('👎');
            message.startThread({
                name: messageArgs,
                autoArchiveDuration: 60,
                type: 'GUILD_PUBLIC_THREAD'
            }); 
        });

            message.delete();
        const suggNo = msg.id;
        
        message.client.users.cache.get(author).send({text: `Hey, ${message.author.username}! Thanks for submitting a suggestion! Our server needs to have time to vote on this. Once some time has passed, you can check the suggestion channel to check the updated status of your suggestion or use the command \`++status-sugg ${msg.id}\` to check the status of your message.!\n\nWe appreciate your feedback! Happy chatting!`});

        try {
            (await connection).query(
                `INSERT INTO Suggs (noSugg, Author, Message, Avatar, stat) VALUES(?, ?, ?, ?, ?)`,
                [suggNo, author, messageArgs, avatar, newStatus]
            );
    
        } catch(err) {
            console.log(err);
        }
    }


    }
}
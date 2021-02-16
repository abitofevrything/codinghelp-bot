const Discord = require('discord.js');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg'],
    inHelp: 'yes',
    description: 'Creates a suggestion!',
    usage: '++suggestions [suggestion here]',
    execute(message, args){

    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) return message.channel.send('suggestions channel does not exist!');
    
    let messageArgs = args.join(' ');

    const initial = new Discord.MessageEmbed()
    .setColor('FADF2E')
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(messageArgs)
    .setFooter('📈 This suggestion currently needs votes and feedback. If you would like to discuss it, please visit <#799835436783763467> and discuss it there.');

    channel.send(initial).then((msg) =>{
        msg.react('👍');
        msg.react('👎');
        message.delete();
    }).catch((err)=>{
        throw err;
    });



    }
}
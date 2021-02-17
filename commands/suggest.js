const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion', 'sugg'],
    inHelp: 'yes',
    description: 'Creates a suggestion!',
    usage: '++suggestions [suggestion here]',
    async execute(message, args){

    const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
    if(!channel) return message.channel.send('suggestions channel does not exist!');
    
    let messageArgs = args.join(' ');
    let d = new Date,
    dformat = [d.getMonth()+1,
        d.getDate(),
        d.getFullYear()].join('/')+' '+
        [d.getHours(),
        d.getMinutes(),
        d.getSeconds()].join(':');;
    let newStatus = 'Needs votes!';
    try {
        (await connection).query(
            `INSERT INTO Suggs (Author, Message, LAST_EDITED, STATUS) VALUES('${message.author.tag}', '${messageArgs}', CURRENT_TIMESTAMP(), '${newStatus}')`
        );
    } catch(err) {
        console.log(err);
    }

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
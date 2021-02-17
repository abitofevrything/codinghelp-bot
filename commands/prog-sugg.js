const Discord = require('discord.js')

module.exports = {
    name: 'progresssugg',
    aliases: ['inprogsugg', 'workingsugg', 'workingsuggestion', 'inprogresssuggestion', 'inprogresssuggestions', 'workingsuggestion', 'worksugg', 'ps', 'ws'],
    inHelp: 'yes',
    description: 'Marks a specific suggestion as in progress with the current status. **Note:** This can only be ran by moderators.',
    usage: '++progresssugg messageID [status message]',
    execute(message, args, guild, client) {


        const inprogress = new Discord.MessageEmbed()
        .setColor('004d4d')
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(messageArgs)
        .addFields(
            { name: 'This suggestion was implemented.', value: 'User implemented this.'},
        )
        .setFooter('If you would like to suggest something, type it in this channel!');

        if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
        message.channel.send(inprogress)
        } else {
            message.channel.send('You do not have the permissions to use this command. You must be a moderator of our server. If this is in error, please report it.')
        }

    }
};
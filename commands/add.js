const Discord = require('discord.js');
const connection = require('../database.js');

module.exports = {
    name: 'add',
    description: 'This displays a ping/pong command in a channel. Checks to see if the bot is alive.',
    aliases: ['beep', 'pong'],
    usage: '!ping',
    execute (message, args) {
        console.log('before perms are checked...\n');

        if(!message.member.hasPermission("MANAGE_MESSAGES") ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
        } else {
            console.log('after perms are checked and before user ID is taken...\n')
            const mmbr = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            console.log(mmbr);
            if(!mmbr) {
                message.reply('You need to include a user ID or mention of the user you want to add to the database.');
            } else {
                    let embed = new Discord.MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`User I have added to the database`)
                        .setDescription(`${mmbr}`)
                        .setFooter('Only users that have been online at least once since this bot was last rebooted will be shown here. Other users can be added using the add-participants command.');
                    message.channel.send(embed);
                   
                } 

        }

    }
}
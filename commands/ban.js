const Discord = require("discord.js");
const patreon = require('../config.json');
const client = new Discord.Client();

module.exports = {
    name: 'ban',
    description: 'Bans a user.\n**Note:** This can only be used by people who have the BAN_MEMBERS permission.',
    aliases: ['getout', 'banned'],
    usage: '.ban @username or ID [reason]',
    inHelp: 'yes',
    execute(message, args) {
        // Defines and logs variables
        const reason = args.slice(1).join( " " );
        console.log('reason: ' + reason);
        const person = message.mentions.users.first();
        console.log('user banned: ' + person);

        if (args.length < 2) {
            message.reply(':question: Please mention the user you want to ban and specify a ban reason.');
            return;
        }

        if(!message.member.hasPermission('BAN_MEMBERS')) { 
            
            if (!person) {
                message.reply(':x: Please use a proper mention if you want to ban someone.');
                return;
            }
    

            try {
                message.guild.members.ban(person, { reason });
            } catch (error) {
                message.channel.send(`Failed to ban **${person.tag}**: ${error}`);
                console.log(error);
                return;
            }
    
            message.channel.send(`:white_check_mark: Successfully banned **${person.tag}** from the server!`);
            console.log('BANNED!');
        }
    },
};
const Discord = require("discord.js");
const patreon = require('../config.json');
const client = new Discord.Client();

module.exports = {
    name: 'unban',
    description: 'Unbans a user.\n**Note:** This can only be used by people who have the BAN_MEMBERS permission.',
    aliases: ['comeback', 'de-ban', 'letin', 'open'],
    usage: '.unban @username or ID [reason]',
    inHelp: 'yes',
    execute(message, args) {
        // Defines and logs variables
        const reason = args.slice(1).join( " " );
        console.log('reason: ' + reason);
        const person = message.mentions.users.first();
        console.log('user unbanned: ' + person);

        if (args.length < 2) {
            message.reply(':question: Please mention the user you want to ban and specify a ban reason.');
            return;
        }

        if(!message.member.hasPermission('BAN_MEMBERS')) { 
            const person = message.mentions.users.first();
            if (!person) {
                message.reply(':question: Please use a proper mention if you want to ban someone.');
                return;
            }
    
            try {
                message.guild.members.unban(person, { reason });
            } catch (error) {
                message.channel.send(`:x: Failed to unban **${person.tag}**: ${error}`);
                console.log(error);
                return;
            }
    
            message.channel.send(`:white_check_mark: Successfully unbanned **${person.tag}** from the server!`);
            console.log('THEY CAN JOIN AGAIN! WOO!');
        }

    },
};
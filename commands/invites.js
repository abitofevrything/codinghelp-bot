const Discord = require("discord.js");

module.exports = {
    name: 'invite',
    description: 'Pushes an invite link.',
    aliases: ['link', 'invites'],
    usage: '.invite',
    inHelp: 'yes',
    execute(message, args) {

        message.channel.createInvite()
        .then(invite => message.reply(`Here is your invite code~ https://discord.gg/${invite.code}`))
        .catch(console.error);  

  },
  
};
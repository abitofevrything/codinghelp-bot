const Discord = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'Displays a user\'s avatar.', 
    aliases: ['pic', 'image', 'av'], 
    usage: '.avatar @username or ID',
    inHelp: 'yes',
    execute(message, args) {

        if (args[0]) {
            
            const person = message.mentions.users.first();
            if (!person) {
                return message.reply('Please use a proper mention if you want to see someone elses avatar.');
            }
    
            return message.channel.send(`${person.username}'s avatar: ${person.displayAvatarURL({ dynamic: true })}`);
        }
    
        return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);

  },
  
};
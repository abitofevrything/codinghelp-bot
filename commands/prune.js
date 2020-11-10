const Discord = require("discord.js");

module.exports = {
    name: 'prune', // name the command something
    description: 'Delete up to 99 messages. Only users with the `MANAGE_MESSAGES` role will be able to use this command.', // Describe your command; shows this with the help command
    aliases: ['delete', 'goaway'], // Include if you have other names you want to use for this command as well.
    execute(message, args) {

        const amount = parseInt(args[0]);
        console.log(amount);
  
        if (isNaN(amount)) {
            return message.reply('Oops! That doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('Please enter a valid number between 1 and 99.');
        } 

        if( message.channel.bulkDelete(amount, true).then(deletedMessages => {
            //filter the deleted messages with .filter()
            var botMessages = deletedMessages.filter(m => m.author.bot);
            var userPins = deletedMessages.filter(m => m.pinned);
            var userMessages = deletedMessages.filter(m => !m.author.bot);

            const deletEmbed = new Discord.MessageEmbed()
                .setColor('	#00FF00')
                .setTitle("Success! :thumbsup:")
                .setFooter("r/CodingHelp Bot")
                .setTimestamp()
                .addField("Bot Messages Purged", botMessages.size, false)
                .addField("User Pins Purged", userPins.size, false)
                .addField("User Messages Purged", userMessages.size, false)
                .addField("Total Messages Purged", deletedMessages.size, false);


            message.channel.send(deletEmbed);
        }).catch(err => {
            console.error(err);
            message.channel.send('Whoops! There was an error trying to prune messages in this channel! Check the command and try again.');
        });
    
    },
    
  };
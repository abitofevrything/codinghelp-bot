const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'error',
    description: 'Tells users how to read error messages.',
    aliases: ['uhh', 'issue', 'err'],
    usage: '++error <@username or ID>',
    example: '++error or ++issue or ++err',
    inHelp: 'yes',
    execute(message, args) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Our Website')
            .setStyle('LINK')
            .setURL('https://codinghelp.site'),
          new MessageButton()
            .setLabel('Our Subreddit')
            .setStyle('LINK')
            .setURL('https://reddit.com/r/CodingHelp')
        );

      if (message.reference === null) { // just a regular message
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) {
            message.channel.send({ content: 'You need to specify a user via mention or the ID.'});
            message.delete();
            return;
        }
        else {
          message.delete();
          message.channel.send({ content: `Hey, ${user}, It looks like you have a question about an error message you received with your code. If you check out the following tutorial, it can teach you how to read error messages that you receive.`, components: [row]});
        }
      }
      else {
        const user = message.mentions.repliedUser;
        message.channel.send({ content: `Hey, ${user.username}, It looks like you have a question about an error message you received with your code. If you check out the following tutorial, it can teach you how to read error messages that you receive.`, components: [row]});
      }
    }

};
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'wiki',
    description: 'Provides a link to our Website.',
    aliases: ['kb', 'knowledgebase', 'site', 'website'],
    usage: '++wiki',
    example: '++wiki or ++kb',
    inHelp: 'yes',
    execute(message) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel('Our Website')
            .setStyle('LINK')
            .setURL('https://codinghelp.site'),
          new MessageButton()
            .setLabel('Our Subreddit')
            .setStyle('LINK')
            .setURL('https://reddit.com/r/CodingHelp'),
          new MessageButton()
            .setLabel('Our Discord')
            .setStyle('LINK')
            .setURL('https://discord.gg/geQEUBm')
        );
        if (message.reference === null) { // just a regular message
          message.reply({ content: 'So, you want a link to our wiki? Here it is! https://codinghelp.site', components: [row]});
        } else {
          message.channel.send({ content: 'So, you want a link to our wiki? Here it is! https://codinghelp.site', components: [row]});
        }
    },
  };
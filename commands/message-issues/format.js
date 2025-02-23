const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'format',
  description: 'Asks people to format their code with backticks or by sharing their code on places like pastebin.com',
  aliases: ['highlight'],
  usage: '++format @username or user ID',
  example: '++format @DudeThatsErin',
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
          .setURL('https://reddit.com/r/CodingHelp'),
        new MessageButton()
          .setLabel('Need more help learning to format your code?')
          .setStyle('LINK')
          .setURL('https://www.writebots.com/discord-text-formatting/')
      );
    if (message.reference === null) { // just a regular message
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) {
        message.channel.send({ content: 'You need to specify a user via mention or the ID.' });
        message.delete();
        return;
      }
      else {
        let usr = message.mentions.members.first();
        const formatEmbed = {
          color: '#7DBFBF',
          title: 'Did you format your code?',
          url: 'https://codinghelp.site',
          thumbnail: {
            url: 'https://imgur.com/U6cwQxj.png'
          },
          description: `Please format your code using backticks. If you don\'t understand, we have an example below. Future code you share will be deleted until you format it.`,
          fields: [
            {
              name: 'How do I format my code?',
              value: 'Great question! You will want to use the backtick key next to your keyboard. It looks like this \\`. It is next to your number 1 key on your keyboard.\n\nIf you have a single line of code, you will want to use a single backtick around your code like so: \\`<img src="image source here" alt="alt text here" />\\`\n\nIf you have multiple lines of code (2 or more) you will want to use 3 backticks around your code like so:\n``````\n<html>\nextra code here...\nanother line here...\n</html>\n\u17b5`\u17b5`\u17b5`\u17b5```\nThis outputs this:\n```<html>\nextra code here...\nanother line here...\n</html>```\nAlso, highlight the syntax, after the first 3 backticks you will write the type of code it is, like HTML, JavaScript, Java, Bat (for batch files), etcetera. Highlighted code looks like so:\n```html\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>```'
            },
            {
              name: 'Why do I have to format my code?',
              value: 'You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.'
            }
          ]
        };

        usr.send({ content: `Hey, ${usr}!`, embeds: [formatEmbed], components: [row] });
      }
      message.channel.send({ content: `📨 Hey, ${user} I just sent you a DM about formatting your code! Please check it!` });
    } else {
      let usr = message.mentions.repliedUser;
      const formatEmbed = {
        color: '#7DBFBF',
        title: 'Did you format your code?',
        url: 'https://codinghelp.site',
        thumbnail: {
          url: 'https://imgur.com/U6cwQxj.png'
        },
        description: `Please format your code using backticks. If you don\'t understand, we have an example below. Future code you share will be deleted until you format it.`,
        fields: [
          {
            name: 'How do I format my code?',
            value: 'Great question! You will want to use the backtick key next to your keyboard. It looks like this \\`. It is next to your number 1 key on your keyboard.\n\nIf you have a single line of code, you will want to use a single backtick around your code like so: \\`<img src="image source here" alt="alt text here" />\\`\n\nIf you have multiple lines of code (2 or more) you will want to use 3 backticks around your code like so:\n``````\n<html>\nextra code here...\nanother line here...\n</html>\n\u17b5`\u17b5`\u17b5`\u17b5```\nThis outputs this:\n```<html>\nextra code here...\nanother line here...\n</html>```\nAlso, highlight the syntax, after the first 3 backticks you will write the type of code it is, like HTML, JavaScript, Java, Bat (for batch files), etcetera. Highlighted code looks like so:\n```html\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>```'
          },
          {
            name: 'Why do I have to format my code?',
            value: 'You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.'
          }
        ]
      };

      usr.send({ content: `Hey, ${usr.username}!`, embeds: [formatEmbed], components: [row] });
      message.channel.send({ content: `📨 Hey, ${usr.username} I just sent you a DM about formatting your code! Please check it!` });
    }
  },

};
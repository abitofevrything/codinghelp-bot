const { MessageActionRow, MessageButton } = require('discord.js');

//Rule Embeds
const rule1 = {
  color: '#1a1a1a',
  title: 'Rule 1',
  url: 'https://codinghelp.site',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: 'No spam, advertising, or NSFW content. Be Nice & Use common sense. If you are found to post spam or advertise you will be [warned or banned as stated here](https://codinghelp.site/wiki/rules/warnings-bannings/).'
}

const rule2 = {
  color: '#1a1a1a',
  title: 'Rule 2',
  url: 'https://codinghelp.site',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Don\’t ask if you can ask a question, just ask it! If someone knows the answer, they\’ll do their best to help. \n\nIf you are found to be asking if you can ask a question or if anyone is available several times after being reminded each time, you will be warned or banned.`
}

const rule3 = {
  color: '#1a1a1a',
  title: 'Rule 3',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  url: 'https://codinghelp.site',
  description: `If you need help with a problem in your code, always provide the raw code in GitHub gist or a similar place. If you aren’t sure what places, you can check [this article](https://codinghelp.site/wiki/faq/share-code/).`
}

const rule4 = {
  color: '#1a1a1a',
  title: 'Rule 4',
  url: 'https://codinghelp.site',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Do not message the mods directly for any reason. If you are wanting to message the mods, please use the Modmail bot. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be warned or banned.`
}

const rule5 = {
  color: "#1a1a1a",
  title: 'Rule 5',
  url: 'https://codinghelp.site',
  thumbnail: {
    url: 'https://imgur.com/U6cwQxj.png'
  },
  description: `Do not ask our members personal questions like gender, age, sexual preference, etc. This is not a dating server, nor is it a place where those questions matter. They mean nothing when it comes to whether or not someone can code. If someone decides to share anything, they can do so using their own free will. Explicitly asking these questions will get you warned, muted, or banned depending on the circumstances. **NO EXCEPTIONS.**`
}

// Actual Rule Command
module.exports = {
  name: "rules",
  description: "Asks users to make sure they are following the rules. This deletes your message pinging the bot and the one right under that.",
  aliases: ['follow', 'pls', 'rule'],
  usage: '++rules @username or user ID rule number[1-5] or ++rules all @username or ID',
  inHelp: 'yes',
  modOnly: 'yes',
  execute(message, args) {
    const rules = []; // Keeps all of the rules inside an array.
    rules.push(rule1); // Pushes the rule1 embed. Each one below it pushes it's own embed. Each line is a separate rule and that is how the array knows 1 from 2 from 3, etc.
    rules.push(rule2);
    rules.push(rule3);
    rules.push(rule4);
    rules.push(rule5);

    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel('All our Rules')
          .setStyle('LINK')
          .setURL('https://codinghelp.site'),
        new MessageButton()
          .setLabel('Our Knowledgebase')
          .setStyle('LINK')
          .setURL('https://codinghelp.site')

      );

    if (message.reference === null) { // just a regular message

      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if (!user) return message.channel.send({ content: 'You need to specify a user via mention or the ID.' }); // if a user isn't mentioned.

      if (args[1] === 'all') { // Displays all of the rules when ++rules all is run.
        user.send({ content: 'These are all of our server\'s rules:' });
        for (let i = 0; i < rules.length; i++) {
          user.send({ embeds: [rules[i]], components: [buttons] });
        }
      }

      else {
        const nb = parseInt(args[1])
        if (nb < 1 || nb > rules.length || isNaN(nb)) { // Gives an error if a correct rule number isn't specified.
          message.reply({ content: "Please enter a valid rule number. If you aren't sure what is a valid rule number, please check: https://codinghelp.site/wiki/rules/discord-server-rules" });
          return;
        };
        let usr = message.mentions.members.first();

        usr.send({ content: `${usr}, Please follow the rules: \n`, embeds: [rules[nb - 1]], components: [buttons] }); // DMs the user.
      }

      //message.channel.bulkDelete(1); //Happens To Every Command
      message.reply({ content: `📨 Hey, ${user} I just sent you a DM about our rules! Please check it!` });
    }
    else { // if new message reply

      const user = message.mentions.repliedUser.id;
      if (!user) return message.channel.send('You need to specify a user via mention or the ID.'); // if a user isn't mentioned.

      if (args[0] === 'all') { // Displays all of the rules when ++rules all is run.
        user.send({ content: 'These are all of our server\'s rules:' });
        for (let i = 0; i < rules.length; i++) {
          user.send({ embeds: [rules[i]], components: [buttons] });
        }
      }

      else {
        const nb = parseInt(args[0])
        if (nb < 1 || nb > rules.length || isNaN(nb)) { // Gives an error if a correct rule number isn't specified.
          message.reply({ content: "Please enter a valid rule number. If you aren't sure what is a valid rule number, please check: https://codinghelp.site/wiki/rules/discord-server-rules" });
          return;
        };
        const usr = message.mentions.repliedUser;

        usr.send({ content: `Hello ${usr.username}, Please follow the rules: \n`, embeds: [rules[nb - 1]], components: [buttons] }); // DMs the user.
      }

      const usr = message.mentions.repliedUser;

      //message.channel.bulkDelete(1); //Happens To Every Command
      message.reply({ content: `📨 Hey, ${usr.username} I just sent you a DM about our rules! Please check it!` });
    }
  }
}
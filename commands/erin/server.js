// at the top of your file
const Discord = require('discord.js');
const ee = require('../../config/embed.json');

module.exports = {
    name: 'format-about',
    description: 'Displays information how to format your code.',
    usage: '++format-about',
    ownerOnly: 1,
    execute(message, args) {
        const formatEmbed = new Discord.MessageEmbed()
            .setColor(ee.blue)
            .setTitle('How do I format my code according to Rule 3?')
            .setDescription(`Please format your code using back ticks. If you don\'t understand, we have an example below. Future code you share will be deleted until you format it.`)
			.addFields(
				{ name: 'How do I format my code?', value: 'Great question! You will want to use the backtick key next to your keyboard. It looks like this \\`. It is next to your number 1 key on your keyboard.\n\nIf you have a single line of code, you will want to use a single backtick around your code like so: \\`<img src="image source here" alt="alt text here" />\\`\n\nIf you have multiple lines of code (2 or more) you will want to use 3 back ticks around your code like so:\n``````\n<html>\nextra code here...\nanother line here...\n</html>\n\u17b5`\u17b5`\u17b5`\u17b5```\nThis outputs this:\n```<html>\nextra code here...\nanother line here...\n</html>```\nAlso, highlight the syntax, after the first 3 back ticks you will write the type of code it is, like HTML, JavaScript, Java, Bat (for batch files), etcetera. Highlighted code looks like so:\n```html\n<html>\n<head>\n</head>\n<body>\n</body>\n</html>```' },
				{ name: 'Why do I have to format my code?', value: 'You need to format it because it is easy to read regardless of what device you are using to view Discord. So, to make it easier for all our members to be able to help you, we ask that you format your code as shown above.' }
			);

        message.channel.send({ embeds: [formatEmbed], components: [
            {
            type: 1,
            components: [
            {
                type: 2,
                style: 5,
                label: 'Get more information on how to format your code.',
                url: `https://codinghelp.site/threads/what-is-markdown-and-how-do-i-use-it.38/`
            }
            ]
        }
        ] });


    },

};
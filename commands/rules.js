const { prefix, config } = require('../config.json');
const Discord = require("discord.js");

//Rule Embeds
const rule1 = new Discord.MessageEmbed()
.setColor('#1a1a1a')
.setTitle('Rule 1')
.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
.setThumbnail('https://imgur.com/U6cwQxj.png')
.setDescription('No spam, advertising, or NSFW content. Be Nice & Use common sense. If you are found to post spam or advertise you will be [warned or banned as stated here](https://codinghelp.site/wiki/rules/warnings-bannings/).');

const rule2 = new Discord.MessageEmbed()
.setColor('#1a1a1a')
.setTitle('Rule 2')
.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
.setThumbnail('https://imgur.com/U6cwQxj.png')
.setDescription(`Don\’t ask if you can ask a question, just ask it! If someone knows the answer, they\’ll do their best to help.

If you are found to be asking if you can ask a question or if anyone is available several times after being reminded each time, you will be warned or banned.`);

const rule3 = new Discord.MessageEmbed()
.setColor('#1a1a1a')
.setTitle('Rule 3')
.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
.setThumbnail('https://imgur.com/U6cwQxj.png')
.setDescription(`If you need help with a problem in your code, always provide the raw code in GitHub gist or a similar place. If you aren’t sure what places, you can check [this article](https://codinghelp.site/wiki/faq/share-code/).`);

const rule4 = new Discord.MessageEmbed()
.setColor("#1a1a1a")
.setTitle('Rule 4')
.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
.setThumbnail('https://imgur.com/U6cwQxj.png')
.setDescription(`Do not message the mods directly for any reason. If you are wanting to message the mods, please use the Modmail bot. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be warned or banned.`);

// Actual Rule Command
module.exports = {
    name: "rules",
    description: "Asks users to make sure they are following the rules. This deletes your message pinging the bot and the one right under that.",
    aliases: ['follow', 'pls'],
    usage: '++rules @username or user ID rule number[1-4]',
    inHelp: 'yes',
    execute(message, args) {
        const rules = []; // Keeps all of the rules inside an array.
        rules.push(rule1); // Pushes the rule1 embed. Each one below it pushes it's own embed. Each line is a separate rule and that is how the array knows 1 from 2 from 3, etc.
        rules.push(rule2);
        rules.push(rule3);
        rules.push(rule4);
 
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('You need to specify a user via mention or the ID.'); // if a user isn't mentioned.

        if (args[0] === 'all') { // Displays all of the rules when ++rules all is run.
            let text = '';
            for (let i = 0; i < rules.length ; i++) {
                text += rules[i] + '\n';
            }
            message.author.send("These are all of our server rules.\n" + text);
        }
 
        else {
            if(!message.member.hasPermission("SEND_MESSAGES")){ // Allows any user that can send messages, use this command.
                message.channel.send('You can\'t use that');
                return;
                }    
 
            if(!user) { // Gives an error if the user isn't specified.
                message.channel.send('You need to specify a user via mention or the ID.');
                message.delete();
                return;
                }
            const nb = parseInt(args[1])
            if (nb < 1 || nb > rules.length || isNaN(nb)) { // Gives an error if a correct rule number isn't specified.
                message.channel.send ("Please enter a valid rule number. If you aren't sure what is a valid rule number, please check: https://codinghelp.site/wiki/rules/discord-server-rules");
                message.delete();
                return;
            };
            let usr = message.mentions.members.first();
            message.channel.send(`${usr}, Please follow the rules: \n`, rules[nb-1]); // Pings the user and deletes the message and asks them to follow the rules.
            }
        message.channel.bulkDelete(2); //Happens To Every Command
    }
}
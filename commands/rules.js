const { prefix, config } = require('F:/LIVE_BOTS/codinghelp-bot/config.json');
const Discord = require("discord.js");
var client = require("F:/LIVE_BOTS/codinghelp-bot/index.js").client;

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

module.exports = {
    name: "rule",
    description: "Display Rules",
 
    execute(message, args) {
        const rules = [];
        rules.push(rule1);
        rules.push(rule2);
        rules.push("**1** Testing");
 
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Please specify a user, via mention or ID'); // if a user isn't mentioned.

        if (args[0] === 'all') {
            let text = '';
            for (let i = 0; i < rules.length ; i++) {
                text += rules[i] + '\n';
            }
            message.author.send("Our Server Rules Are; \n" + text);
        }
 
        else {
            if(!message.member.hasPermission("MANAGE_GUILD")){
                message.channel.send('You can\'t use that');
                return;
                }    
 
            const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if(!user) {
                message.channel.send('Please specify a user, via mention or ID');
                message.delete();
                return;
                }
            const nb = parseInt(args[1])
            if (nb < 1 || nb > rules.length || isNaN(nb)) {
                message.channel.send ("Invaild Rule Number");
                message.delete();
                return;
            };
            let usr = message.mentions.members.first();
            message.channel.send(`${usr}, Please Follow Rule: \n`, rules[nb-1]);
            }
        message.channel.bulkDelete(2); //Happens To Every Command
    }
}
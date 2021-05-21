// at the top of your file
const Discord = require('discord.js');
 
module.exports = {
    name: 'about',
    description: 'Displays all the information on the #welcome channel.\n**Note:** Only the Mod Team can run this command.',
    aliases: ['codinghelp', 'server', 'welcome'],
    usage: '++about',
    inHelp: 'yes',
    execute(message, args) {   
        
            const welcomeEmbed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('Welcome to r/CodingHelp\'s Discord Server!')
            .setDescription('We are a Discord Server dedicated to helping people learn how to code. We have over 1.5k members and can\'t wait to welcome more! Come join the community of people that are looking to share their knowledge with new programmers!')
            .setImage('https://images-ext-1.discordapp.net/external/r__1ELtLocROQQFz8W5GmWQzOA5wlP4Tag7XTbGqQpY/https/media.discordapp.net/attachments/586293598996135953/757414290058903712/FxSHhhK.png')
            .addFields (
                { name: 'Current Staff', value: 'Owner: <@455926927371534346>\nDiscord Mods: <@541305895544422430>, <@732667572448657539> & <@198147661449134080>\nSubreddit Mods: <@444524618401841152>, <@332652477528801280>, & <@136611109007261696>' },
                { name: 'How can I become part of the staff team?', value: 'You can apply [on our website](https://codinghelp.site/modapp/). We accept applications all year long though becoming a mod happens randomly. We will post in <#359760352470368281> when we are opening moderator positions for any of our locations.' },
                { name: '♾️ Invite your friends!', value: 'https://discord.gg/geQEUBm' },
            )
            .setFooter('Logo by Matt aka v4#1503.');
 
            const rulesEmbed1 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setImage('https://images-ext-1.discordapp.net/external/wbHOzT7RFJ6aTebef6VLDQZ21TQI5G0bJbWxhKRkm7U/https/images-ext-1.discordapp.net/external/IDGCI4g2TYyMowvu6pgHqMgk7ASin73_3OT8n7il_FQ/https/i.imgur.com/Pr7JkVc.png');
 
            const rulesEmbed2 = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Our Rules')
            .setDescription('If you want to read about all of our rules in detail you can check out [our website](https://codinghelp.site/knowledgebase/rules/discord-server-rules).')
            .addFields (
                { name: 'Rule 1', value: 'No spam, advertising or NSFW content. Be nice. Use common sense.\n\nIf you are found to post spam or advertise, you will be warned or banned as stated [here](https://codinghelp.site/knowledgebase/rules/warnings-bannings/).' },
                { name: 'Rule 2', value: '[Don’t ask if you can ask a question, just ask it!](https://codinghelp.site/knowledgebase/faq/just-ask/) If someone knows the answer, they’ll do their best to help.' },
                { name: 'Rule 3', value: 'If you need help with a problem in your code, always provide the raw code in GitHub gist or a similar place. If you aren’t sure what places, you can check [this article](https://codinghelp.site/knowledgebase/faq/share-code/).' }, 
                { name: 'Rule 4', value: 'Do not message the mods directly for any reason. If you are wanting to message the mods, please use the Modmail bot <@575252669443211264>. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be [warned or banned](https://codinghelp.site/knowledgebase/rules/warnings-bannings/).' }, 
                { name: 'Rule 5', value: 'Do not ask our members personal questions like gender, age, sexual preference, etc. This is not a dating server, nor is it a place where those questions matter. They mean nothing when it comes to whether or not someone can code. If someone decides to share anything, they can do so using their own free will. Explicitly asking these questions will get you warned, muted, or banned depending on the circumstances. **NO EXCEPTIONS.**' }, 
            )
            .setFooter('Please check our website (codinghelp.site) for the most up-to-date rules!');
 
            const formatEmbed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('How do I format my code according to Rule 3?')
            .setDescription('Great question! We have that explained on [our wiki](https://codinghelp.site/knowledgebase/faq/share-code/).');
 
            const accessEmbed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle('Get Access to Our Server!')
            .setDescription('Please check <#703989632110690324> and react to the correct message to get access to our server!');
            
            if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
                message.channel.bulkDelete(1);
                message.channel.send(welcomeEmbed);
                message.channel.send(rulesEmbed1);
                message.channel.send(rulesEmbed2);
                message.channel.send(formatEmbed);
                message.channel.send(accessEmbed);
            } else {
                message.reply('❌ You do not have permissions to use this command. You must be part of the staff team.');
                return;
            }
 
    },
    
  };
// at the top of your file
const Discord = require('discord.js');
 
module.exports = {
    name: 'partners',
    description: 'Displays all the information on the #announcements channel.\n**Note:** Only the Mod Team can run this command.',
    aliases: ['affies', 'affiliates', 'partner'],
    usage: '++about',
    inHelp: 'yes',
    execute(message, args) {   
        
            const aboutPartner = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle('What is a Discord Partner?')
            .setDescription('That is someone that has partnered with our server as they believe in it as much as the staff team does.')
            .addFields (
                { name: 'How do I become a Discord Partner?', value: 'All you need to do is message the mods and ask. To message the mods you will want to use our Modmail bot: <@754368625216978965> Be sure to include the invite link to your server.\nAlternatively, you can [visit our website](https://codinghelp.site/partner-app/) to fill out our application and we will get back to you.\nNote: Small servers will not be accepted. Your server will need ot be establisted with at least 1,500 members. This doesn\'t mean you will be accepted with that minimum, just that we will consider you with at least that many members.' },
            )
 
            const smartWatch = new Discord.MessageEmbed()
            .setColor('TAN')
            .setTitle('Smart Watch')
            .setImage('https://media.discordapp.net/attachments/792764567649517582/793749473959346186/Banner.png')
            .setDescription('The server for the intellectual watch wearer. Smartwatch is a place to talk with other watch wearers and get help on making your smartwatch part of your daily life, with Support teams for the major wearable brands. We offer community & brand events, as well as up to date news about your favorite brands.')
            .addFields (
                { name: 'Representative', value: '<@521656100924293141>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/nPEHdsyjDg', inline: true },
            )
 
            const alphaBet = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setTitle('AlphaBet')
            .setImage('https://images-ext-2.discordapp.net/external/VK5lVCOz1EndZMQ1Lf_uOLlBHeOUjT2k5wh1B6hlbaE/https/media.discordapp.net/attachments/746035174160203789/786949644285509642/alphabet_logo_small.png')
            .setDescription('Welcome to AlphaBet Community. AlphaBet is a coding community for learning programming, like- Python, Java, C, C++, C#, Go, Rust, Haskell, Lisp, Rust, Scala, Clojure, Swift, Kotlin, Web-Development, JavaScript, Typescript, Ruby, Crystal, Lua, PHP, SQL-Database ....\n:bookmark: Daily coding tasks for members regularly.\n:bookmark: Exclusive Polling Contest with our bot.\n:bookmark: For Job Hunters: Interview questions & discussion.\n:bookmark: Different coding events, competitions and group projects.\n:bookmark: We are active 24/7.')
            .addFields (
                { name: 'Representative', value: '<@561178341978144799>', inline: true },
                { name: '♾️Link', value: 'https://discord.gg/PCkrwRXQJ9', inline: true }
            );
            
            if(message.member.roles.cache.has('780941276602302523') || message.member.roles.cache.has('718253309101867008')) {
                message.channel.bulkDelete(1);
                message.channel.send(aboutPartner);
                message.channel.send(smartWatch);
                message.channel.send(alphaBet);
            } else {
                message.reply('❌ You do not have permissions to use this command. You must be part of the <@780941276602302523>.');
                return;
            }
 
    },
    
  };
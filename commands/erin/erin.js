const Discord = require('discord.js');
const ee = require('../../config/embed.json');
module.exports = {
    name: 'erin',
    aliases: ['me', 'dev'],
    cooldown: 0,
    ownerOnly: 'yes',
    execute(message, args, client) {

        const embed = new Discord.MessageEmbed()
            .setColor(ee.rand_color)
            .setTitle('Here are all of the commands you can use, Erin!')
            .setDescription('\`\`\`css\nerin-json\nclearsuggs\nerin\nfileUpload\nserver\nstatus\ntoadd\ntofix\nquicknotes\nclearadd\nclearfix\nclearnotes\n\`\`\`')
            .setTimestamp()
            .setFooter({ text: 'This list was last updated on 1-5-2022 @ 9:00pm EST.', iconURL: ee.footericon });
        
        message.channel.send({ embeds: [embed] });
    }
}
const ee = require('../../config/embed.json');
const bot = require('../../config/bot.json');
const discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Creates an invite link that never expires for you to use to invite people to our server.',
    execute (interaction) {
        const embed = new discord.MessageEmbed()
            .setColor(`${ee.rand_color}`)
            .setTitle('Here is your invite link!')
            .setDescription('You can use this link to invite people to this server:\n\nhttps://discord.gg/geQEUBm')
            .setFooter({ text: ee.footertext, iconURL: ee.footericon });

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}
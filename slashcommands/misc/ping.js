const { MessageEmbed } = require('discord.js');
const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const ee = require('../../config/embed.json');

module.exports = {
  name: 'ping',
  description: 'Makes sure the bot can hear commands.',
  cooldown: 5,
  execute(interaction, client) {
    let days = Math.floor(interaction.client.uptime / 86400000);
    let hours = Math.floor(interaction.client.uptime / 3600000) % 24;
    let minutes = Math.floor(interaction.client.uptime / 60000) % 60;
    let seconds = Math.floor(interaction.client.uptime / 1000) % 60;

    let embed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle(`${client.user.tag} is online!`)
      .setURL('https://stats.uptimerobot.com/v56YJuEr3x')
      .setThumbnail(bot.avatar)
      .setDescription(`Thanks for checking if ${bot.name} was online. ${bot.name} has been awake for \`${days}d ${hours}h ${minutes}m ${seconds}s\`!\nMy prefix is \`${config.prefix}\`\nI am the official bot of the [CodingHelp](${bot.website}) Discord Server! If you want to see all of my commands run \`/help\` or [check here](https://codinghelp.site/threads/coding-help-discord-bot-commands.69/).\n\nIf you have found an issue with the bot, please run \`${config.prefix}report\` to report the issue!`)
      .setTimestamp()
      .setFooter({ text: `Thanks for using ${bot.name}!`, iconURL: ee.footericon})

      interaction.editReply({ embeds: [embed], components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: 'Find us on Reddit',
              url: bot.reddit
            },
            {
              type: 2,
              style: 5,
              label: 'Visit our Website',
              url: bot.url
            },
            {
              type: 2,
              style: 5,
              label: 'Find us on GitHub',
              url: bot.github
            },
            {
              type: 2,
              style: 5,
              label: 'Share our Invite link!',
              url: bot.server
            },
            {
              type: 2,
              style: 5,
              label: 'View our Uptime',
              url: 'https://stats.uptimerobot.com/v56YJuEr3x'
            }
          ]
        }
      ] });
  }
};
const { MessageEmbed } = require('discord.js');
const config = require('../../config/config.json');
const bot = require('../../config/bot.json');
const owner = require('../../config/owner.json');

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
      .setURL(bot.url)
      .setThumbnail(bot.avatar)
      .setDescription(`Thanks for checking if ${bot.name} was online. ${bot.name} has been awake for \`${days}d ${hours}h ${minutes}m ${seconds}s\`! You can see the uptime of my website [here](${bot.uptime})!\nMy prefix is \`${config.prefix}\`\nI am the official bot of the [CodingHelp](${bot.url}) Discord Server! If you want to see all of my commands run \`/help\` or [check here](${bot.commands}).\nIf you want to know exactly how I am coded, you can see all of my pieces parts on my [GitHub Repo](${bot.github}).\n\nYou can find CodingHelp at these locations:\n[Reddit](${bot.reddit})\n[Website](${bot.url})\n\nIf you have found an issue with the bot, please run \`${config.prefix}report\` to report the issue!`)
      .setTimestamp()
      .setFooter({ text: `Thanks for using ${bot.name}!`, iconURL: bot.avatar })

    interaction.editReply({ embeds: [embed], ephemeral: true });
  }
};
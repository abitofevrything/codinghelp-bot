const Discord = require('discord.js');

module.exports = {
	name: 'rule4', 
	description: 'This displays rule 4 for our users.',
	execute(message, args) {

		const rule4 = new Discord.MessageEmbed()
		.setColor('#1a1a1a')
		.setTitle('Rule 4')
		.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
		.setThumbnail('https://imgur.com/U6cwQxj.png')
		.setDescription(`Do not message the mods directly for any reason. If you are wanting to message the mods, please use the Modmail bot. If you are messaging the mods directly, your messages will be ignored. If you are continually messaging the mods, you will be warned or banned.`)

		message.channel.send(rule4)

	},
};
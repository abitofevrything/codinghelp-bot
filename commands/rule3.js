const Discord = require('discord.js');

module.exports = {
	name: 'rule3', 
	description: 'This displays rule 3 for our users.',
	execute(message, args) {

		const rule3 = new Discord.MessageEmbed()
		.setColor('#1a1a1a')
		.setTitle('Rule 3')
		.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
		.setThumbnail('https://imgur.com/U6cwQxj.png')
		.setDescription(`If you need help with a problem in your code, always provide the raw code in GitHub gist or a similar place. If you aren’t sure what places, you can check [this article](https://codinghelp.site/wiki/faq/share-code/).`)

		message.channel.send(rule3)

	},
	
};
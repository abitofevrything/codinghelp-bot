const Discord = require('discord.js');

module.exports = {
	name: 'rule2', 
	description: 'This displays rule 2 for our users.',
	execute(message, args) {

		const rule2 = new Discord.MessageEmbed()
		.setColor('#1a1a1a')
		.setTitle('Rule 2')
		.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
		.setThumbnail('https://imgur.com/U6cwQxj.png')
		.setDescription(`Don\’t ask if you can ask a question, just ask it! If someone knows the answer, they\’ll do their best to help.

		If you are found to be asking if you can ask a question or if anyone is available several times after being reminded each time, you will be warned or banned.`)

		message.channel.send(rule2)

	},
	
};
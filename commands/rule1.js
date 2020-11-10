const Discord = require('discord.js');

module.exports = {
	name: 'rule9', // name the command something
	description: 'Diplays Rule 1 for our users.', // Describe your command; shows this with the help command
	execute(message, args) {

		const rule1 = new Discord.MessageEmbed()
		.setColor('#1a1a1a')
		.setTitle('Rule 1')
		.setURL('https://codinghelp.site/wiki/rules/discord-server-rules/')
		.setThumbnail('https://imgur.com/U6cwQxj.png')
		.setDescription('No spam, advertising, or NSFW content. Be Nice & Use common sense. If you are found to post spam or advertise you will be [warned or banned as stated here](https://codinghelp.site/wiki/rules/warnings-bannings/).')

		message.channel.send(rule1)

	},
	
};
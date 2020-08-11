const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports.run = (bot, message, args) => {

	const embed = new RichEmbed()
		.setColor('#0099ff')
		.setTitle('Rules')
		.setURL('https://discord.js.org/')
		.setAuthor('Author', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('Our Rules Here')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addFields(
			{ name: 'Title 1', value: 'Some value here' },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Inline field title 2', value: 'Some value here 2', inline: true },
			{ name: 'Inline field title 3', value: 'Some value here 3', inline: true },
		)
		.addField('Inline field title 4', 'Some value here 4', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
		
	return message.channel.send(embed);
};

module.exports.help = {
	name: "help",
	aliases: ["h"],
	description: "Help command to show the commands",
	usgae: "help (command name)",
	category: "Misc",
};
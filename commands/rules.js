const Discord = require("discord.js"); 

module.exports = {
	name: "rules",
	aliases: ["r"],
	description: "These are the rules for our server",
	usgae: "rules",
	category: "Important",
	execute(message, args) {

		
const help = new Discord.MessageEmbed()
	.setColor('#D78EEA')
	.setTitle('Rules')
	.setAuthor('The Insomniacs Staff', 'https://i.imgur.com/bA40tH6.png', 'https://discord.gg/utt49Hg')
	.setDescription('These are our server\'s rules.')
	.setThumbnail('https://i.imgur.com/BsXWZZm.png')
	.addFields(
		{ name: 'Rule 1', value: 'Please follow Discord\'s Terms of Service. You must be over 13 to use Discord.' },
		{ name: 'Rule 2', value: 'You must be over 18 to use this server or you will be banned.' },
		{ name: 'Rule 3', value: 'Please keep all picture and video posts in the <#717275271870283807> channel.' },
		{ name: 'Rule 4', value: 'Please keep all other posts in the correct channels.' },
		{ name: 'Rule 5', value: 'No NSFW content such as porn or erotic roleplay under any circumstances.' },
		{ name: 'Rule 6', value: 'If someone is bothering you, DM a <@&717261100143607919> Member.' },
	)
	.setImage('https://i.imgur.com/Xv4gQ4H.png')
	.setTimestamp()
	.setFooter('These were last updated on July 4th, 2020', 'https://i.imgur.com/bA40tH6.png');

message.channel.send(help);
	
	
}

};
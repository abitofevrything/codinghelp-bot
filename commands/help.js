const { prefix, config } = require('/root/ch-bot/config.json');
const Discord = require("discord.js");

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('r/CodingHelp\'s Commands')
	.setDescription('All of our commands start with **++**. So, if you want to run the ping command you run **++ping**.\n \nAliases are additional commands you can use, for example,  the ping command has the \'sup\' alias which means you can run it by using **++sup** as well as **++ping**.')
	.setThumbnail('https://i.imgur.com/sWa1jKB.png')
	.addFields(
		{ name: 'Frequently Asked Questions (faq)', value: 'This command is run by using **++faq**.\n **Aliases:** question, frequent\n **Description:** Tells users to check out our FAQ channel and docs to get their simple questions answered.\n **Message Sent:** Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn\'t answered there then you may leave your question here for others to help you answer. Thank you!' },
		{ name: 'Please be Patient', value: 'This command is run by using **++patience**.\n **Aliases:** wait, bepatient, justwait\n **Description:** Tells people to be patient when waiting for advice.\n	**Message Sent:** Please give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information. Please only post your question once every 48 hours and do not ask for help in multiple channels. Thank you!' },
		{ name: 'Share Your Code', value: 'This command is run by using **++share-code**.\n	**Aliases:** welcome, code, share-your-code, seecode\n **Description:** Tells people to share their code as shown in the #welcome channel.\n **Message Sent:** Please share your code as shown in the #welcome channel. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!' },
		{ name: 'Just Ask', value: 'This command is run by using **++justask**.\n **Aliases:** ja, ask\n **Description:** Tells users to just ask their question instead of asking if someone is here or if someone can help them.\n **Message Sent:** Please just ask your question. Rule 4 prohibits you from asking if someone is available or if someone can help you. Please include any code that is necessary. If you have any questions please refer to #welcome. Thank you!' },
		{ name: 'Please elaborate', value: 'This command is run by using **++elaborate**.\n **Aliases:** explain, more-info, moreinfo\n **Description:** Asks people to elaborate by including code or by including omre information.\n **Message Sent:** Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. :smile:' },
		{ name: 'Ping', value: 'This command is run by using **++ping**.\n **Aliases:** hello, sup\n **Description:** Makes sure the bot is online.\n **Message Sent:** :ping_pong: ### ms\n *^^ replace ### with whatever the response time is from the bot.*' },
		{ name: 'Rules 1 through 6', value: 'This command is run by using **++rule#** replacing # with the rule number. For example, rule 3 would be **++rule3**.\n **Aliases:** no aliases for these.\n **Description:** This displays our rules via the command so we can make sure users follow them.\n **Message Sent:** The message sent depends on the rule that is used in the command.'}
	)
	.setTimestamp()
	.setFooter('Last Updated on Monday, Oct. 5th, 2020 at 4:40pm EST by the r/CodingHelp Mod Team.', 'https://i.imgur.com/sWa1jKB.png');

	module.exports = {
		name: 'help', // name the command something
		description: 'Displays all information regarding commands', // Describe your command; shows this with the help command
		aliases: ['h', 'halp', 'commands'], // Include if you have other names you want to use for this command as well.
		usage: '[command name]',
		inHelp: 'yes',
		execute(message, args) {
	
			message.channel.send(helpEmbed);
	
		},
		
	};
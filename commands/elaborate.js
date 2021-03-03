module.exports = {
	name: 'elaborate', 
	description: 'Asks people to elaborate by including code or by including more information.',
	aliases: ['explain', 'more-info', 'moreinfo'],
	usage: '++elaborate @username or user ID',
	inHelp: 'yes',
	execute(message) {
		message.channel.send(`Hey, ${usr}!` + ' Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. :smile:');
		message.channel.bulkDelete(1);

	},
	
};
module.exports = {
	name: 'faq', // name the command something
	description: 'Tells users to check out our FAQ channel and docs to get their simple questions answered.', // Describe your command; shows this with the help command
	aliases: ['question', 'frequent'], // Include if you have other names you want to use for this command as well.
	usage: '++[command]',
	execute(message, args) {

		message.channel.send("Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn't answered there then you may leave your question here for others to help you answer. Thank you!")

	},
	
};
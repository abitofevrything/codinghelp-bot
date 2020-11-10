module.exports = {
	name: 'justask', // name the command something
	description: 'Tells users to just ask their question instead of asking if someone is here or if someone can help them.', // Describe your command; shows this with the help command
	aliases: ['ja', 'ask'], // Include if you have other names you want to use for this command as well.
	usage: '++[command]',
    execute(message, args) {

        message.channel.send("Please just ask your question. Rule 4 prohibits you from asking if someone is available or if someone can help you. Please include any code that is necessary. If you have any questions please refer to <#383032186317832202>. Thank you!")

	},
	
};
module.exports = {
	name: 'patience', // name the command something
	description: 'Tells people to be patient when waiting for advice.', // Describe your command; shows this with the help command
	aliases: ['wait', 'bepatient', 'justwait'], // Include if you have other names you want to use for this command as well.
	usage: '++[command]',
	execute(message, args) {

        message.channel.send("Please give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information. Please only post your question once every 48 hours and do not ask for help in multiple channels. Thank you!")

	},
	
};
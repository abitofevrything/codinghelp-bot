module.exports = {
	name: 'rule4', // name the command something
	description: 'Displays rule 4 for our users.',
	execute(message, args) {

		message.channel.send("Please follow **Rule 4** which states \"Don't ask if you can ask a question, just ask it! If someone knows the answer, they'll do their best to help.\"")

	},
	
};
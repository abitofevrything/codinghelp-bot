module.exports = {
	name: 'rule3', // name the command something
	description: 'Displays rule 3 for our users',
	execute(message, args) {

		message.channel.send("Please follow **Rule 3** which states Restarter (bot) will keep nicknames ascii characters only. This is to make mentioning users easier and make mobile users experience better.")

	},
	
};
module.exports = {
	name: 'rule5', // name the command something
	description: 'Displays rule 5 for our users.',
	execute(message, args) {

		message.channel.send("Please follow **Rule 5** which states \"If you need help with a problem in your code, please always provide the raw code in a GitHub gist or similar, if possible such as with websites in a live format.\"")

	},
	
};
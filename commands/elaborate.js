module.exports = {
	name: 'elaborate', // name the command something
	description: 'Asks people to elaborate by including code or by including omre information.', // Describe your command; shows this with the help command
	aliases: ['explain', 'more-info', 'moreinfo'], // Include if you have other names you want to use for this command as well.
	execute(message, args) {

		message.channel.send("Please elaborate. Our members are unable to help you unless you give us more information like the specific code you are working with or more details. If you are unsure what to include, feel free to ask what we need. :smile:")

	},
	
};
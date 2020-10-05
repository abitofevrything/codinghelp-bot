module.exports = {
	name: 'rule1', // name the command something
	description: 'Diplays Rule 1 for our users.', // Describe your command; shows this with the help command
	execute(message, args) {

		message.channel.send("Please follow **Rule 1** which states by continuing to access this Discord server, you agree to the rules listed in the <#383032186317832202> channel, which may be edited at any time.")

	},
	
};
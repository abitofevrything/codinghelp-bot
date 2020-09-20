module.exports = {
	name: 'share-code', // name the command something
	description: 'Tells people to share their code as shown in the #welcome channel.', // Describe your command; shows this with the help command
	aliases: ['welcome', 'code', 'share-your-code', 'seecode'], // Include if you have other names you want to use for this command as well.
	execute(message, args) {

        message.channel.send("Please share your code as shown in the <#383032186317832202> channel. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. For security reasons we do not allow uploading of files or pictures on our server. Thank you!")

	},
	
};
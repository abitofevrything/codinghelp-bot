module.exports = {
	name: 'share-code', // name the command something
	description: 'Tells people to share their code as shown in the <#383032186317832202> channel.', // Describe your command; shows this with the help command
	aliases: ['welcome', 'code', 'share-your-code', 'seecode'], // Include if you have other names you want to use for this command as well.
	usage: '++share-code @username or user ID',
	inHelp: 'yes',
	execute(message, args) {

		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		if(!user) {
			message.channel.send('You need to specificy a user via mention or the ID.');
			message.delete();
			return;
		}
		else { 
			let usr = message.mentions.members.first();
       		message.channel.send(`Hey, ${usr}!` + ' Please share your code as shown in our wiki. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!\nSee here: https://codinghelp.site/wiki/faq/share-code/');
		}
		message.channel.bulkDelete(1);
	},
	
};
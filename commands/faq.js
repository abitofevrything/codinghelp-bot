const { DiscordAPIError } = require("discord.js");

module.exports = {
	name: 'faq',
	description: 'Tells users to check out our FAQ channel and docs to get their simple questions answered.',
	aliases: ['question', 'frequent'],
	usage: '++faq @username or user ID',
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
			usr.send(`Hey, ${usr}!` +  ' Please check out the <#742604331215487006> channel or the <#742594501922652260> channel as we have a lot of questions answered in those two places. If it isn\'t answered there then you may leave your question here for others to help you answer. Thank you!\nYou can also check our website to see if your quesiton is answered: https://codinghelp.site');
		}
		message.channel.bulkDelete(1);
		message.channel.send(`📨 Hey, ${user} I just sent you a DM with a link to our FAQs! Please check it!`);
	},
	
};
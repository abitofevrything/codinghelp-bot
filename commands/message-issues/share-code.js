module.exports = {
	name: 'share-code',
	description: 'Tells people to share their code as shown in the <#383032186317832202> channel.',
	aliases: ['code', 'share-your-code', 'seecode'],
	usage: '++share-code @username or user ID',
	example: '++share-code @DudeThatsErin',
	inHelp: 'yes',
	execute(message, args) {
    if (message.reference === null) { // just a regular message

		const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
		if(!user) {
			message.channel.send({ content: 'You need to specify a user via mention or the ID.'});
			message.delete();
			return;
		}
		else { 
			let usr = message.mentions.members.first();
       		usr.send({ content: `Hey, ${usr}!` + ' Please share your code as shown in our wiki. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!\nSee here: https://codinghelp.site/wiki/faq/share-code/'});
		}
		message.reply({ content: `📨 Hey, I just sent them a DM about sharing your code! Please check it!`});
  }
  else {
    const user = message.mentions.repliedUser;
    user.send({content: `Hey, ${user.username}!` + ' Please share your code as shown in our wiki. If it is too long for Discord, please upload it to a place like CodeShare.io and share the link to the code here so we can take a look at it. Thank you!\nSee here: https://codinghelp.site/wiki/faq/share-code/'});
    message.channel.send({ content: `📨 I just sent them a DM about sharing your code! Please check it!`});
  }
	},
	
};
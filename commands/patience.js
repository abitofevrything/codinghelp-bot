module.exports = {
	name: 'patience', // name the command something
	description: 'Tells people to be patient when waiting for advice.', // Describe your command; shows this with the help command
	aliases: ['wait', 'bepatient', 'justwait'], // Include if you have other names you want to use for this command as well.
	usage: '++[command]',
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
		  usr.send(`Hey, ${usr}!` + ' Please give our users some time to review your question. We understand your excitment and appreciate it but our users need time to look over your question and give you the proper information. Please only post your question once every 48 hours and do not ask for help in multiple channels.\nYou can also check out our website to see if your question is answered there: https://codinghelp.site');
		}
		message.channel.bulkDelete(1);
		message.channel.send(`📨 Hey, ${user} I just sent you a DM! Please check it!`);

	},
	
};
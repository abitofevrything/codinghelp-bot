	module.exports = {
		name: 'help',
		description: 'Refers user to our Website to either request commands or view all of our commands.',
		aliases: ['h', 'halp', 'commands'],
		usage: '++help [ping user]',
		execute(message, args) {


			message.reply('Hey! You can see all of our commands on our website here: https://codinghelp.site/commands/');
		},
		
	};
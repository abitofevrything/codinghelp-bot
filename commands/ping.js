module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(message, args) {
		// console.log(message.guild.roles);
		message.channel.send('Pong.');
	},
};
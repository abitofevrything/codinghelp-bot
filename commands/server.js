const Discord = require("discord.js"); 

module.exports = {
	name: 'server',
	description: 'Shows your server name and total members.',
	aliases: ['server-info', 'info'],
	execute(message, args) {
		
const server = new Discord.MessageEmbed()
	.setColor('#8EE9EA')
    .setTitle(`Hello there, ${message.author}!`)
    .setDescription(`Welcome to ${guild.name}!`)
    .addFields(
	{ name: 'Member Count', value: `${g.MemberCount}` },
	{ name: 'Server Region', value: `test` },
	{ name: 'Server ID', value: `test` },
	{ name: 'Server Invite Link', value: `test` },
	{ name: 'test', value: 'test' },
	)
	.setImage('')
	.setTimestamp()
	.setFooter('');

message.channel.send(server);
}

	
};
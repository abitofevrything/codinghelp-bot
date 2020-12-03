const { prefix, config } = require('../config.json');
const Discord = require("discord.js");

const helpEmbed1 = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help Menu pg 1')
    .setDescription('Use `++help <command>` for more information.')
    .addFields(
        { name: 'Messages', value: '```css\nelaborate\njustask\nshare-code\nfaq\nrequests\npatience\nwrong-channel\nformat\nbin\nmods\nwiki\ndocs\nrules\n```', inline: true },
		{ name: 'Utilities', value: '```css\navatar\nhelp\nping\nprune\ninvites\nchk-invites\nmute\nunmute\nban\nunban\n```', inline: true },
		{ name: 'Contests/Challenges', value: '```css\ncontest-leaderboard\naddpoints\naddchallenge\nsubmitchallenge\nsubmit\n```', inline: true },
		{ name: 'Leveling System', value: '```css\nthanks\nleaderboard\npoints\n\n**NOTE:**This is conflicting with the Christmas Challenge currently. Erin has to recode it so it stops so this is only partially working.\n```', inline: true },
    );

	module.exports = {
		name: 'help', // name the command something
		description: 'Displays all information regarding commands', // Describe your command; shows this with the help command
		aliases: ['h', 'halp', 'commands'], // Include if you have other names you want to use for this command as well.
		usage: '++help or ++help [command name]', // Shows how the commmand is used.
		inHelp: 'yes', // Necessary so that it displays the information in an Embed when using ++help [command]
		execute(message, args) {
		if(args.length > 0) {
			const cmd = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if(!cmd) return message.channel.send("That command could not be found!");
			if(!cmd.inHelp) return message.channel.send("No help for that command could be found!");
			else{
				const emb = new Discord.MessageEmbed().setColor('#0099ff').setTitle(`Help for \`${cmd.name}\``);
				if(cmd.description){
					emb.setDescription(cmd.description, true);
				}else{
					emb.setDescription("No description could be found");
				}
				if(cmd.usage){
					emb.addField("Usage", cmd.usage, false);
				}
				if(cmd.aliases){
					emb.addField("Aliases", cmd.aliases.join(", "), false);
				}
				message.channel.send(emb);
			}
		}else{
			message.channel.send(helpEmbed1);
		}
		message.channel.bulkDelete(1);
		},
		
	};
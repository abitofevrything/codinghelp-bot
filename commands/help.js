const Discord = require("discord.js");
const config = require("../config.json");

const helpEmbed1 = new Discord.MessageEmbed()
    .setColor('#e8bffd')
    .setTitle('Help Menu')
    .setDescription(`Use \`${config.client.prefix}help <command>\` for more information.`)
    .addFields(
        { name: 'General Commands', value: 'Any user can use these commands.```css\nhelp\nping\nhire\ntech\nreddit\nwrong-channel\nshare-code\nformat\npatience\nelaborate\nwiki\nelaborate\nchannel\nbin\n```' },
		{ name: 'Suggestion System Commands', value: 'Any user can use these commands.```css\nsuggestions\nstatus-sugg\neditsugg\n```'},
		{ name: 'Suggestion System Commands for Mods', value: 'Only Discord Mods can use these commands.```css\nclearsuggs\nupdatesugg\ndenysugg\ncompletesugg\n```' },
		{ name: 'Challenge System Commands', value: 'Any user can use these commands.```css\nsubmit\nedit-submission\n```'},
		{ name: 'Challenge Commands for Mods', value: 'Only Challenge Mods can use these commands. ```css\npurge-submissions\nreviewed\nremove-user\nremove-submission\nedit-challenge\nstart-challenge\nchallenges\ncheck-submissions\ncheck-participants\nadd-users\nadd-members\nremove-points\n```'},
		{ name: 'General Moderation Commands', value: 'Only DIscord Mods can use these commands.```css\nprune\nserver\npartners\n```'},
		{ name: 'Check out all of our commands!', value: 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!' }
    );


module.exports = {
		name: 'help',
		description: 'Refers user to our Website to either request commands or view all of our commands.',
		aliases: ['h', 'halp', 'commands'],
		usage: '++help',
		example: '++help or ++h',
		inHelp: 'yes',
		execute(message, args) {

			if(args.length > 0) {
		
				const cmd = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
		
				if(!cmd) return message.channel.send("That command could not be found!");
		
				if(!cmd.inHelp) return message.channel.send("No help for that command could be found!");
		
				else{
					const emb = new Discord.MessageEmbed().setColor('#e8bffd').setTitle(`Help for \`${config.client.prefix}${cmd.name}\``);
					if(cmd.description){
						emb.setDescription(cmd.description, true);
					}else{
						emb.setDescription("No description could be found");
					}
					if(cmd.aliases){
						emb.addField("Aliases", cmd.aliases.join(", "), false);
					}
					if(cmd.usage){
						emb.addField("Usage", cmd.usage, false);
					}
					if(cmd.example) {
						emb.addField("Example Usage", cmd.example, false)
					}

					emb.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);
		
					message.author.send(emb).catch(async err => {
						message.channel.send(`Hey ${message.user.username}, it looks like you have your DMs closed. So I am displaying the command here.`);
							message.channel.send(emb);
					});
				}
				} else{
					message.author.send(helpEmbed1).catch(async err => {
						message.channel.send(`Hey ${user}, it looks like you have your DMs closed. So I am displaying the command here.`);
						message.channel.send(helpEmbed1);
					});;
				}
				if(message.channel.type !== "dm") {
					message.channel.send('📨 Please check your DMs! I sent you a message with our help command!').catch(async err => {
						message.channel.send(`Hey ${user}, it looks like you have your DMs closed. So I am displaying the command here.`);
						message.channel.send(helpEmbed1);
					});
				} else {
			}
		},
				
};

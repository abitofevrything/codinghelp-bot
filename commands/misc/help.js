const paginationEmbed = require('discord.js-pagination');
const {	MessageEmbed } = require('discord.js');
const config = require("../../config.json");

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information about themselves or another user they ping or provide the ID for.',
	aliases: ['h', 'halp', 'command', 'commands'],
	usage: '++help',
	inHelp: 'yes',
	example: '++help or ++h or ++halp',
	async execute(msg, args) {

		const embed1 = new MessageEmbed()
			.setColor('#6683AD')
			.setTitle('Help Menu page 1 - General Commands')
			.setDescription('These are all of the commands r/CodingHelp can do. If you want to get more information you can do \`++help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.')
			.addFields({
				name: 'These are commands any user can use.',
				value: '```css\nping\navatar\nuser-info\nserver-info\nbot-info\nrules\nhelp\nerror\nreddit\ntech\nformat\nchannel\nbin\ndocs\nshare-code\nmods\njust-ask\npatience\nthanks\nwiki\nwrong-channel\nreport\nstatusreport\n\n```'
			}, )
			.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);
		
		const embed2 = new MessageEmbed()
			.setColor('#6683AD')
			.setTitle('Help Menu page 2 - Moderator Only Commands')
			.setDescription('These are all of the commands r/CodingHelp can do. If you want to get more information you can do \`++help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.')
			.addFields({
				name: 'These are general **moderator** only commands. Meaning only **moderators** can use these commands.',
				value: '```css\nprune\nserver\npartners\ncompletedreport\nbot-status\nserver-status\nsub-status\n```'
			})
			.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);

		const embed3 = new MessageEmbed()
			.setColor('#6683AD')
			.setTitle('Help Menu page 3 - Suggestion System Commands')
			.setDescription('These are all of the commands r/CodingHelp can do. If you want to get more information you can do \`++help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.')
			.addFields({
				name: 'These are commands any user can use for our Suggestions System.',
				value: '```css\nsuggestions\neditsugg\nstatussug\n```'
			}, {
				name: 'These are our **moderator** only commands for our Suggestions System.',
				value: '```css\nprog-sugg\ndenied-sugg\ncompletedsugg\n```'
			})
			.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);

		const embed4 = new MessageEmbed()
			.setColor('#6683AD')
			.setTitle('Help Menu page 4 - Challenge System Commands')
			.setDescription('These are all of the commands r/CodingHelp can do. If you want to get more information you can do \`++help <command>\`. Clicking the emojies at the bottom of this message will allow you to go through all of our commands.')
			.addFields({
				name: 'These are commands any user can use for our Challenge System.',
				value: '```css\nsubmit\nedit-submission\nchallenge-leaderboard\nuser-check-submissions\n```'
			}, {
				name: 'These are our **moderator** only commands for our Challenge System.',
				value: '```css\nadd-members\nadd-users\ncheck-participants\nremove-participant\nstart-challenge\nchallenge\nedit-challenge\nmods-check-submissions\nreviewed\npurge-submissions\nend-challenge\n```'
			})
			.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);

		pages = [
			embed1,
			embed2,
			embed3,
			embed4
		];

		let cmdd = args[0];

		if (cmdd) { //WORKS

			const cmd = msg.client.commands.get(args[0]) || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));

			if (!cmd) return msg.channel.send("That command could not be found!");

			if (!cmd.inHelp) return msg.channel.send("No help for that command could be found!");

			const emb = new MessageEmbed()
				.setColor('#e8bffd')
				.setTitle(`Help for \`${config.bot.prefix}${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description, true);
			} else {
				emb.setDescription("No description could be found");
			}
			if (cmd.note) {
				emb.addField("Note", cmd.note, false)
			}
			if (cmd.aliases) {
				emb.addField("Aliases", cmd.aliases.join(", "), false);
			}
			if (cmd.usage) {
				emb.addField("Usage", cmd.usage, false);
			}
			if (cmd.example) {
				emb.addField("Example Usage", cmd.example, false)
			}
			if (cmd.cooldown) {
				emb.addField("You need to wait this long between usages of this command (in seconds):", cmd.cooldown, false)
			}
			if (cmd.modOnly) {
				emb.addField("Is this a command that only moderators can use?", cmd.modOnly, false)
			}
			if (cmd.permissions) {
				emb.addField("You must have these permissions to run this command:", cmd.permissions, false)
			}

			emb.addField("Check out all of our commands!", 'If you visit our [website](https://codinghelp.site/commands/) you can see all of our commands!', false);

			msg.channel.send(emb);

		} else {
			paginationEmbed(msg, pages, ['◀️', '▶️'], '3600000');
		}
	},
};
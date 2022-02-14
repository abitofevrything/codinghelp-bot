const { Discord, MessageEmbed } = require("discord.js");
const config = require('../../config/config.json');
const prefix = config.prefix;
const ee = require('../../config/embed.json');
const { ButtonPaginator } = require('@psibean/discord.js-pagination');
const wait = require('util').promisify(setTimeout);
const bot = require('../../config/bot.json');

module.exports = {
	name: 'help',
	description: 'This allows users to find out more information on all of our commands.',
	options: [
		{
			name: 'commandname',
			description: 'Type command name here or leave blank to see all commands.',
			required: false,
			type: 3
		}
	],
	int: 1,
	async execute(interaction, client) {
		const pages = [];
		const roleColor =
			interaction.guild.me.displayHexColor === "#000000"
				? "#ffffff"
				: interaction.guild.me.displayHexColor;
		const tit = '📩 Help';

    const general = new MessageEmbed()
      .setColor(ee.pink)
      .setTitle(tit)
      .setDescription(`These are the general slash commands that you can use with the \`/\` prefix.\n\`\`\`markdown\n# Avatar\n> /help avatar\n> /avatar @username\nDisplays the avatar of the user that you pick.\n\n# Code\n> /help code\n> /code\nLinks user to our website and subreddit.\n\n# Coin Flip\n> /help coinflip\n> /coinflip\nFlips a coin and displays the outcome.\n\n# Help\n> /help help\n> /help\nProvides users with these embeds.\n\n# Invite\n> /help invite\n> /invite\nProvides an invite code to the user that runs this.\n\n# Ping\n> /help ping\n> /ping\nMakes sure the bot is online, shows when it was last restarted and displays relevant information about the bot.\n\n# Tech\n> /help tech\n> /tech\nLinks people to the TechSpaced server for additional tech support.\`\`\``);

    const msgIssue = new MessageEmbed()
        .setColor(ee.purple)
				.setTitle(tit)
        .setDescription(`These are the commands that you can use whenever someone sends a message that doesn\'t follow our rules. These commands all use the \`/\` prefix. Meaning they are slash commands.\n\n\`\`\`markdown\n# Bin\n> /help bin\n> /bin\nTells users to upload their code at places like pastebin.com and gives a few different links for where they can upload their code.\n\n# Channel\n> /help channel\n> /channel @username\nDMs a user the #channelguide to users if they aren't sure about where to post a question.\n\n# Docs\n> /help docs\n> /docs @username\nRefers a user to our forum where we have FAQs and a long list of docs they can use to help them learn a language.\n\nElaborate\n> /help elaborate\n> /elaborate @username\nAsks people to elaborate on a question they have.\n\n# Error\n> /help error\n> /error @username\nDirects people to our forum where there is an easy tutorial for them to learn how to read error messages.\nhire\n> /help hire\n> /hire @username\nDirects people to #requestcoders or #marketplace to request help for a project.\n\n# Just Ask\n> /help just-ask\n> /just-ask @username\nTells people to just ask their question instead of asking "can someone help me with CSS?" or something similar.\n\n# Mods\n> /help mods\n> /mods @username\nTells people not to ping/DM mods and refers people to DM the Modmail bot.\n\n# Patience\n> /help patience\n> /patience @username\nTells people to have patience with their question if they are bumping too fast.\n# Share Code\n> /help share-code\n> /share-code @username\nAsks people to share the code and tells them how to format it.\n\n# Wiki\n> /help wiki\n> /wiki @username\nRefers people to our forum for additional help.\n\n# Wrong Channel\n> /help wrong-channel\n> /wrong-channel @username\nTells people they posted in the wrong channel and refers them to #channelguide to get additional help.\`\`\``);

      const challenges = new MessageEmbed()
          .setColor(ee.orange)
          .setTitle(tit)
          .setDescription(`These Challenge System commands can only be used by users with the Participants role. Contact a Challenge Moderator to make sure you can use these commands.\n\n\`\`\`markdown\n# Submit an answer\n> /help submit\n> ++submit [challengeNumber] [submission]\nYou can use this to submit answers to the challenges.\n\n# Edit Your Submission\n> /help edit-submission\n> ++edit-submission [challengeNumber] [submission message ID]\nThis is how you can edit a submission. The message ID is DM'd to you after you complete your submission by our bot.\n\n# Check Your Submissions\n> /help ucs or /help user-check-submissions\nThis is how you can check if your submissions were graded, by whom and when.\n\n# Check the Challenge Leaderboard\n> /help challenge-leaderboard\n> ++challenge-leaderboard\nYou can use this command to view the leaderboard.\`\`\``);

      const modChallenges = new MessageEmbed()
        .setColor(ee.orange)
        .setTitle(tit)
        .setDescription(`These are the challenge system commands that only Challenge Moderators can use.\n\nmcs or mod-check-submissions [challenge number] - You can use this to check to see who submitted to the challenges and what they submitted and it gives you all the info you need to mark a submission as reviewed.`)
        .addFields(
					{
						name: 'Member Management Commands\nUse these commands to manage the members in the database.',
						value: `\`\`\`markdown\n# Manually Add Members\n> /help manualadd\n> ++manualadd [user ID or ping]\nYou can manually add members to the challenge system.\n\n# Automatically Add Members\n> /help autoadd-members\n> ++autoadd-members\nAs long as the users have the Participants Role you can automatically add them to the database.\n\n# Check Participants\n> /help check-participants\n> ++check-participants\nCheck to see who is in the Challenges Database.\n\n# Remove a Member\n> /help remove-member\n> ++remove-member [member ID or ping]\nAllows you to remove a member that withdraws from the Challenge System.\n\`\`\``
					},
					{
						name: `Challenge Question Management Commands\nUse these commands to manage the Challenge Questions.`,
						value: `\`\`\`markdown\n# Start the Challenge System\n> /help start-challenge\n ++start-challenge prize1|prize2|prize3 \nUse this to start a challenge fresh each time.\n\n# Add a Challenge Question\n> /help challenge\n> ++challenge [challenge number] [question]\nUse this to post the challenges as you go along.\n\n# Edit a Challenge Question\n> /help edit-challeng\n ++edit-challenge [challenge message ID] [new challenge question]\nYou can use this to modify a question that was asked.\n\n# Check user's submissions in the DB\n> /help mcs or /help mod-check-submissions\n> ++mcs [challenge number] or ++mod-check-submissions [challenge number]\nAllows Challenge Moderators to check who submitted to which challenges.\n\n# Stop/End The Challenge System\n> /help end-challenge\n> ++end-challenge\nAllows you to end the challenge and make sure no more submissions are made.\n# Purge all Submissions from the DB\n> /help purge-submissions\n> ++purge-submissions\nPurges/Deletes all submissions from the Challenge Database.\n\`\`\``
					},
          {
            name: 'Submission Management Commands\nThese commands all require the submission message ID you receive with MCS. For the purposes of this embed, that will be called \`SID\`.',
            value: `\`\`\`markdown\n# Mark Submissions as Reviewed\n> /help reviewed\n> ++reviewed [SID] [points]\nYou can give points for submissions and mark them as reviewed. Once a submission is marked as reviewed, participants are NOT able to edit them any longer.\n\n# Remove Points from a Submission\n> /help remove-points\n> ++remove-points [SID] [points]\nAllows you to lower the number of points given for a submission. Note: This keeps a submission marked as reviewed.\n\n# Add Additional Points to a Reviewed Submission\n> /help add-points\n> ++add-points [SID] [points]\nAllows you to give additional points to a message. Note: The submission must be marked as reviewed first.\n\n# Mark a Submission as Unreviewed\n> /help unreviewed\n> ++unreviewed [SID]\nAllows you to mark a submission as unreviewed if the user needs to modify them.\n\n# Clear all Points from a Submission\n> /help clearpoints\n> ++clearpoints [SID]\nRemoves all of the points from the submission specified. Note: This does not mark is as unreviewed.\n\n# Delete a Submission\n> /help remove-submission\b++remove-submission [SID]\nRemoves a singular submission from the database.\`\`\``
          }
        );

        const mods = new MessageEmbed()
          .setColor(ee.green)
          .setTitle(tit)
          .setDescription(`These are commands only Discord Moderators can use.\n\n\`\`\`markdown\n# Update our Members on our Forum Status\n> /help site-status\n> ++site-status [message]\nPosts an update in #announcements about a forum update and pings @Website Updates.\n\n# Update our Members on our Subreddit Status\n> /help sub-status\n> ++sub-status [message]\nPosts an update in #announcements about a subreddit update and pings @Subreddit Updates.\n\n# Update our Members on our Server Status\n> /help server-status\n> ++server-status [message]\nPosts an update in #announcements about a server update and pings @Server Updates.\n\n# Update our Members on our Discord Bot\n> /help bot-status\n> ++bot-status [message]\nPosts an update in #announcements about a discord bot update and pings @Discord Bot Updates.\n\n# DM a User\n> /help dm\n> ++dm @username [message]\nSends an official message from our bot to the specified user's (can be yourself) DMs.\n\n# Request a User follow the Rules\n> /help rules\n> ++rules @username [rule number[1-7]] or ++rules @username all\nSends a DM to the user specified (can be yourself) asking them to follow the rules and sending the rule specified (or all) to them.\n\`\`\``);

        const suggs = new MessageEmbed()
          .setColor(ee.green)
          .setTitle(tit)
          .addFields(
            {
              name: `Basic Suggestion System Commands any user can use.`,
              value: `\`\`\`markdown\n# Suggest Something\n> /help suggest\n> ++suggest [message]\nYou can use this to submit a suggestion.\n\n# Edit a Previous Suggestion\n> /help edit-suggestion\n> ++edit-suggestion [suggestion message ID] [new message]\nYou can use this to modify a suggestion you made in the past. The suggestion message ID is provided by the bot to your DMs after you create a suggestion. You can also get it from the message in the #suggestions channel.\n\n# Check on the Status of Your Suggestion\n> /help status-sugg\n> ++status-sugg[suggestion message ID]\nYou can check the status of your suggestion with this. The suggestion message ID is provided by the bot to your DMs after you create a suggestion. You can also get it from the message in the #suggestions channel.\`\`\``
            },
            {
              name: `Suggestion Management Commands.\nOnly Discord Moderators can use these commands.`,
              value: `\`\`\`markdown\n# Set a Suggestion as In Progress\n> /help prog-sugg\n> ++prog-sugg [suggestion message ID] [in-progress message]\nSets a suggestion as in progress. You can get the message ID from the message in the #suggestions channel.\n\n# Set a Suggestion as Completed.\n> /help completed-sugg\n> ++completed-sugg[suggestion message ID] [completed message]\nMarks a suggestion as completed and removes it from the #suggestions channel.\n\n# Set a Suggestion as Denied\n> /help denied-sugg\n> ++denied-sugg [suggestion message ID] [denied message]\nMarks a suggestion as denied and removes it from the channel.\`\`\``
            }
          );

          const thanks = new MessageEmbed()
            .setColor(ee.blue)
						.setTitle(tit)
            .setDescription(`These are all of the commands that can be used for our Thanks System.\n\n\`\`\`markdown\n# Thank a User\n> /help thanks\n> ++thanks @username @username @username @username\nYou can thank up to 4 people with this command.\n\n# Remove a Thank from a User\n> /help unthank\n> ++unthank @username\nRemoves a thank from a user. Only Discord Moderators can use this command.\n\n# View the Leaderboard\n> /help thanks-leaderboard\n> ++thanks-leaderboard\nAllows you to see the top 10 people in the leaderboard as well as how many thanks you have.\`\`\``);

          const report = new MessageEmbed()
            .setColor(ee.yellow)
            .setTitle(tit)
            .setDescription(`Reports System Commands\n\`\`\`markdown\n# Submit a Report\n> /help report\n> ++report [message]\nSubmits a report to Erin that she can use to work on fixing the issue whatever it may be.\n\n# Check on the Status of Your Report\n> /help statusreport\n> ++statusreport [report message ID]\nAllows you to check on the status of your report. You can get your report message ID from the message the bot sends to your DM when you submit a report.\`\`\``)

          const end = new MessageEmbed()
            .setColor(ee.grey)
            .setTitle(tit)
            .setDescription(`**That's all folks!**\nIf you would like to add new commands or have ideas for commands, you can use the suggestions system.\nYou can view all of the commands and their aliases on our forum: ${bot.url}`)
            .setTimestamp()
            .setFooter({ text: 'This was last updated on 1-16-2022', iconURL: ee.footericon });

		pages.push(general);
		pages.push(msgIssue);
		pages.push(challenges);
		pages.push(suggs);
		pages.push(thanks);
		pages.push(report);
		pages.push(mods);
		pages.push(modChallenges);
		pages.push(end);

		let cmdd = interaction.options.getString('commandname');
		//console.log(cmdd)

		if (cmdd) { //WORKS

			const cmd = client.slashCommands.get(cmdd) || client.commands.get(cmdd) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdd));
			//console.log(cmd)
			if (!cmd) return interaction.editReply({ content: "That command could not be found!", ephemeral: true });

			const emb = new MessageEmbed()
				.setColor(roleColor)
				.setTitle(`Help for \`${cmd.name}\``);
			if (cmd.description) {
				emb.setDescription(cmd.description, true);
			} else {
				emb.setDescription("No description could be found");
			}
			if (cmd.note) {
				emb.addField("Note:", cmd.note, false)
			}
			if (Array.isArray(cmd.aliases) && cmd.aliases.length > 0) {
				emb.addField("Aliases", cmd.aliases.join(", "), false);
			}
			if (cmd.cooldown) {
				emb.addField("You need to wait this long between usages of this command:", `${cmd.cooldown} seconds`, false)
			}
			if (cmd.usage) {
				emb.addField("Usage", cmd.usage, false);
			}
			if (cmd.example) {
				emb.addField("Example Usage", cmd.example, false)
			}
			if (cmd.ownerOnly) {
				emb.addField("THIS IS ONLY A COMMAND ERIN CAN USE. Right?", cmd.ownerOnly, false)
			}
			if(cmd.int) {
				emb.addField(`This command is a slash command. Meaning it cannot have aliases and you use \`/\` to run it.`, `So, to run this command you would use \`/${cmd.name}\``, false)
			}
			if (Array.isArray(cmd.userPerms) && cmd.userPerms.length > 0) {
				emb.addField("You must have these permissions to run this command:", cmd.userPerms.join(", "), false)
			}
			emb.setFooter({ text: ee.footertext, iconURL: ee.footericon });
			//console.log(emb.toJSON());

			for (const embedField of emb.fields) {
				if (embedField.value === undefined || embedField.value === '' || embedField.value === null) console.log(`Field ${embedField.name} is invalid`);
			}
			interaction.editReply({ embeds: [emb], ephemeral: true, components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 5,
							label: 'View all of our commands',
							url: `https://codinghelp.site/threads/coding-help-discord-bot-commands.69/`
						}
					]
				}
			] });

		} else {
			const buttons = [
				{ customIdPrefix: 'paginator', label: `Previous` },
				{ customIdPrefix: 'paginator', label: `Next` },
				{ label: `View all of our commands`, url: `https://codinghelp.site/threads/coding-help-discord-bot-commands.69/` },
			];
			const buttonPaginator = new ButtonPaginator(interaction, { pages, buttons });
			//await wait(2000);
			await buttonPaginator.send();
		}

	},
};
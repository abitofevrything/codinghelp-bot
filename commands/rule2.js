module.exports = {
	name: 'rule2', // name the command something
	description: 'This displays rule 2 for our users.',
	execute(message, args) {

		message.channel.send("Please follow **Rule 2** which states be sensible. No spam, advertising or NSFW content. Be nice. Use common sense.")

	},
	
};
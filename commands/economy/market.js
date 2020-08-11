module.exports = {
	name: 'Marketplace', // name the command something
	description: 'This is where you can buy and sell items for money.', // Describe your command; shows this with the help command
	aliases: ['market', 'shop', 'shoppe', 'shoppette', 'store'], // Include if you have other names you want to use for this command as well.
	guildOnly: true, // Include if you want the command to only run in your server and not in DMs.
	execute(message, args) {

		const marketPlace = {
			first: "blah",
			second: "foo",
			changeme: "initial",
			isCool: false
		}

		myEnmap.set("someObject", marketPlace);

		message.channel.send();

	},
	
};
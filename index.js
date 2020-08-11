// Require Node.js file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require config file
const { prefix, token, config } = require('./c/config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// login to Discord with your app's token
client.login(token);

/* -------------------
FOR THE LEVELING SYSTEM
---------------------- */
// Includes the random library for the economy and levels.
const random = require('random');

// Includes jsonfile modules
const jsonfile = require('jsonfile');


// Includes Math Evaluator so I can do maths
var mexp = require('math-expression-evaluator');
var math = require('mathjs');

// Keeps each guild or server separate so you have different levels for each one.
var stats = {};

// Creates a balance file to keep track of all levels/balances each time the bot is reloaded.
if(fs.existsSync('balance.json')) {
	stats = jsonfile.readFileSync('balance.json');
}
/* ------------------
END FOR THE LEVELING SYSTEM
--------------------- */

// Read the Commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Include the other files we have
for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

// Read the Economy folder
client.economy = new Discord.Collection();
const economyFiles = fs.readdirSync('./commands/economy').filter(file => file.endsWith('.js'));

// Include the other files we have
for (const file of economyFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/economy/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => { // Looking for a message

/* ----------------------------------------------------------
NECESSARY PARTS OF THE FILE
-------------------------------------------------------------- */
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

const command = client.commands.get(commandName)
	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return;

if (command.guildOnly && message.channel.type !== 'text') {
	return message.reply('I can\'t execute that command inside DMs!');
}

if (command.args && !args.length) {
	let reply = `You didn't provide any arguments, ${message.author}!`;

	if (command.usage) {
		reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
	}

	return message.channel.send(reply);
}

/*if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); */

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

/* -----------------------------------------------------------
LEVELING SYSTEM START
-------------------------------------------------------------- */

// Checks to see if the bot is sending a message, if it is, it doesn't give it coins.
if(message.author.id == client.user.id)
return;

// Checks to see if this server has ever used this bot before, if not, adds it to balance.json.
if(message.guild.id in stats === false) {
stats[message.guild.id] = {};
}

const guildStats = stats[message.guild.id]; // Used so I don't have to type stats[message.guild.id] a million times.

// Sets the levels so they can be added to users while leveling up.
let levelFive = message.guild.roles.cache.find(r => r.name === "Level 5");
let levelTen = message.guild.roles.cache.find(r => r.name === "Level 10");
let levelTwenty = message.guild.roles.cache.find(r => r.name === "Level 20");

// Checks if the user has been in this server AND used this bot before, if not, adds them.
if(message.author.id in guildStats === false) {
	guildStats[message.author.id] = {
		coins: 0,
		level: 0,
		last_message: 0
	}
}
const userStats = guildStats[message.author.id]; // Used so I don't have to type stats[message.user.id] a million times.

// Sets the last_message to now and makes it so people can only earn coins ever 10 seconds so the leveling system can't be spammed.
if (Date.now() - userStats.last_message) {
userStats.coins += random.int(15, 25); // Adds a random amount of coins between 15 and 25.
userStats.last_message = Date.now(); // Sets the last_message to the exact time the message was sent.

const coinsToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100; // Math that adds coins to people.
const moreCoins = coinsToNextLevel - userStats.coins;

if(userStats.coins >= coinsToNextLevel) {
userStats.level++; // incements levels by 1.
if(userStats.level = 20) {
	message.member.roles.add(levelTwenty).catch(console.error); // gives user the level 20 role when they reach it.
	message.reply('You now have the level 20 role! Congratulations!');
}
if(userStats.level = 10) {
	message.member.roles.add(levelTen).catch(console.error); // gives user the level 10 role when they reach it.
	message.reply('You now have the level 10 role! Congratulations!');
}
if(userStats.level = 5) {
	message.member.roles.add(levelFive).catch(console.error); // gives user the level 5 role when they reach it.
	message.reply('You now have the level 5 role! Congratulations!');
}
userStats.coins = userStats.coins - coinsToNextLevel; // when users level up, it removes the amount of coins they needed to get to that level from what they have.

message.channel.send(`<a:ablobparty:717793304024055878>` + ' **LEVEL UP!** ' + `<@${message.author.id}>` + ' has reached level ' + userStats.level + ' ! Congratulations!'); // sends a message telling the user they have reached the next level.

}

// Command so users can check their balance.
if(message.content == `${prefix}balance`) {
	nextLevel = userStats.level + 1;
	let user = message.mentions.users.first() || message.author;
    const balance = new Discord.MessageEmbed()
	    .setColor('#45CF12')
		.setTitle(`${user.username}\'s Balance:`)
		.setImage(`${user.avatarURL}`, true)
	    .addFields(
		    { name: `**Current Balance**`, value: `<:coin:735149083341226044> ` + userStats.coins + ` coins` },
            { name: `**Current Level**`, value: `You are currently at level ` + userStats.level + '!' },
			{ name: `**How long until the next level?**`, value: `You need ` + moreCoins + ` more coins to get to level ` + nextLevel + '.'}
	)
	.setTimestamp()
	if(userStats.level) {
		message.channel.send(balance);
	}
}

// Command so mods can erase a user's balance entirely and set them back to the start.
if(message.content == `${prefix}resetBalance`) {
	if(message.member.hasPermission('MANAGE_ROLES', { checkAdmin: false, checkOwner: false})) {
		message.reply('That\'s been done!');
	} else {
		message.reply('You don\'t have permission to use this command! You need the Manage Roles permission.')
	}
}


jsonfile.writeFileSync('balance.json', stats); // Saeves everything to a balance.json file so it can be pulled up at anytime.
// console.log(stats); Used if I want to see the balance.json file without opening it.
}

/* -----------------------------------------------------------
LEVELING SYSTEM END
-------------------------------------------------------------- */

/* --------------------
AVATAR FUNCTION
----------------------- */
function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}
if (command == `${prefix}avatar`) {
	const user = message.author;

const avatar = new Discord.MessageEmbed()
			.setAuthor(`${message.author.username}\'s avatar`)
			.setColor(`#0x348fcd`)
			.setTitle('')
			.addField(
				`${message.author.username}\'s avatar: ${user.displayAvatarURL({ dynamic: true })}`
			)
			.setTimestamp()
			.setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
	
		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatar);
}
/* ----------------
END AVATAR FUNCTION
------------------- */

/* ---------------------------
ROLL DICE FUNCTION
------------------------------ */
const rollSix = () => Math.floor(Math.random() * 6) + 1;
const rollTwo = () => Math.floor(Math.random() * 2) + 1;
const rollTwenty = () => Math.floor(Math.random() * 20) + 1;

if (command == `${prefix}rollSix`) {
    message.reply('rolled a ' + rollSix());
}

if (command == `${prefix}rollTwo`) {
    message.reply('rolled a ' + rollSix());
}

if (command == `${prefix}rollTwenty`) {
    message.reply('rolled a ' + rollSix());
}
/* --------------------------
END ROLL DICE FUNCTION
----------------------------- */

}); // end of looking
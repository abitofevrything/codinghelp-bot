// Require Node.js file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require config file
const { prefix, token, config } = require('F:/LIVE_BOTS/codinghelp-bot/config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// SQLite Includes
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

// login to Discord with your app's token
client.login(token);

// Read the Commands folder
const commandFiles = fs.readdirSync('F:/LIVE_BOTS/codinghelp-bot/commands').filter(file => file.endsWith('.js'));

// Include the other files we have
for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`F:/LIVE_BOTS/codinghelp-bot/commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

  // Sets Bot's Status
  client.user.setPresence({
    status: "dnd", 
    activity: {
        name: "++help",  
        type: "PLAYING" 
    }
  });
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

if (!message.guild) return;

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

try {
	command.execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

}); // end of looking

// Points System
client.on("ready", () => {
	// Check if the table "points" exists.
	const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
	if (!table['count(*)']) {
	  // If the table isn't there, create it and setup the database correctly.
	  sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
	  // Ensure that the "id" row is always unique and indexed.
	  sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
	  sql.pragma("synchronous = 1");
	  sql.pragma("journal_mode = wal");
	}
  
	// And then we have two prepared statements to get and set the score data.
	client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
  });
  
  client.on("message", message => {
	if (message.author.bot) return;
	let score;
	if (message.guild) {
	  score = client.getScore.get(message.author.id, message.guild.id);
	  if (!score) {
		score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
	  }
	  score.points++;
	  const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
	  if(score.level < curLevel) {
		score.level++;
		message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
	  }
	  client.setScore.run(score);
	}
  
	// Command-specific code here!
  });
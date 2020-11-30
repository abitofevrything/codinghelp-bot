// Require Node.js file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require config file
const { prefix, token, config } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

// SQLite Includes
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

// login to Discord with your app's token
client.login(token);

// Read the Commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Include the other files we have
for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

/*Channel ids for:
 * 1 (CHALLENGE_ANNOUNCEMENTS_CHANNEL) :  the channel id for the channel where the challenge will be posted
 * 2 (CHALLENGE_SUBMISSIONS_DUMP_CHANNEL) : the channel (should be mod/helper-only) where user's subissions will be put for review. These can be submitted with the !submit command
*/
const CHALLENGE_ANNOUNCEMENTS_CHANNEL = 782275132013543434;
const CHALLENGE_SUBMISSIONS_DUMP_CHANNEL = 782617080935088179;

let contestData = {
    challenges : [],
    participants : {},
};

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

      //Read contest data from file. If using files is unavailible (hosting restrictions), switch to code that will load the data from a cloud server instead
	  fs.readFile("contestdata.txt", (err, data) => {
        if (err) {
            console.error("Unable to load data from file : " + err);
            return;
        }
        contestData = JSON.parse(data.toString());
		console.log("Loaded contest data from file");
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
	  let assistant = message.guild.roles.cache.get(r => r.id === "780472757313601566");
	  let experienced = message.guild.roles.cache.get(r => r.id === "780851563031691286");
	  let rookie = message.guild.roles.cache.get(r => r.id === "780851658447912972");

	  if (curLevel >= 10) {
		member.roles.add(rookie);
		message.reply('Congratulations! You now have the <@780851658447912972> role! This gives you access to a special channel as well as a cool new username color! WOO HOO!');
		return;
	  }
	  if (curLevel >= 20) {
		member.roles.add(assistant);
		message.reply('Congratulations! You now have the <@780472757313601566> role! This gives you access to a special channel as well as a cool new username color! WOO HOO!');
		return;
	  }
	  if (curLevel >= 50) {
		member.roles.add(experienced);
		message.reply('Congratulations! You now have the <@780851563031691286> role! This gives you access to a special channel as well as a cool new username color! WOO HOO!');
		return;
	  }
	  client.setScore.run(score);
	}
  
	// Command-specific code here!
  });

  // Challenge Code
  //Same here, but for writing to the file. Once again, switch to cloud server saving if files are unavailible
/*function updateFile() {
   fs.writeFile("contestdata.txt", JSON.stringify(contestData), err => {
        if (err) {
            console.error("Unable to save data to file : " + err);
            console.error("Dumping data to console for recovery purposes");
            console.log(JSON.stringify(contestData));
        }
    });
}*/
  //Whenerver a message is sent, update the sent challenges (ideally we would want an event that triggers at midnight on the day, but this works fine too)
client.on('message', message => {
    if (message.author.bot) return;
    if (new Date().getMonth() < 10 /* Change to 10 for testing if needed - this will prevent challenges from being published before december*/) return;
    for (let i = 1; i < contestData.challenges.length; i++) {
        if (contestData.challenges[i] == undefined) continue;
        if (!contestData.challenges[i].sent && new Date().getDay() >= i) {
            let embed = new Discord.MessageEmbed()
            .setTitle(contestData.challenges[i].title)
            .addField("Challenge : ", contestData.challenges[i].description);

            message.guild.channels.cache.find(channel => channel.id == CHALLENGE_ANNOUNCEMENTS_CHANNEL).send(embed).then(msg => {
                contestData.challenges[i].sent = true;
                updateFile();
            });
        }
    }
});
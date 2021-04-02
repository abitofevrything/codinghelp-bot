const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const config = require('./config.json');

let connection = require('./database.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	console.log(file.slice(0,-3));
	const command = require(`./commands/${file.slice(0,-3)}`)
	client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`${client.user.tag} is logged in and ready!`);

  client.user.setPresence({
    status: "online", 
    activity: {
        name: `the server. Run ++help to see my commands.`,  
        type: "LISTENING" 
    }
  });

  // POINTS
  client.getScore = 
    connection.query (
      `SELECT count(*) from Points WHERE guild = ?`,
      [guild.id]
    );
  client.setScore =
    connection.query(
      `INSERT OR REPLACE INTO Points (guildId, points, level) VALUES (@guild, @points, @level)`
    );
});
  
  client.on('guildDelete', guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id}) by ${guild.owner.tag}`);

  });

  client.on('guildCreate', guild => {

    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members! The guild owner is ${guild.owner.tag}`);
  
    try {
      guild.members.cache.map( member => {
        connection.query(
             `INSERT INTO Points (guildId, user) VALUES (?, ?)`,
             [guild.id, user.id]
           );
      });
     }
     catch{console.log(error);}

     /* Points Stuff */
     let score = client.getScore.get(message.author.id, message.guild.id);
     if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      }
    }
    // Increment the score
  score.points++;

  // Calculate the current level through MATH OMG HALP.
  const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

  // Check if the user has leveled up, and let them know if they have:
  if(score.level < curLevel) {
    // Level up!
    score.level++;
    message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
  }

  if(command === "points") {
    return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
  }

  if(command === "give") {
    // Limited to guild owner - adjust to your own preference!
    if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
  
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if(!user) return message.reply("You must mention someone or give their ID!");
  
    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
  
    // Get their current points.
    let userscore = client.getScore.get(user.id, message.guild.id);
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
    }
    userscore.points += pointsToAdd;
  
    // We also want to update their level (but we won't notify them if it changes)
    let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;
  
    // And we save it!
    client.setScore.run(userscore);
  
    return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
  }
  
  if(command === "leaderboard") {
    const top10 = connection.query("SELECT * FROM Points WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
  
      // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription("Our top 10 points leaders!")
      .setColor(0x00AE86);
  
    for(const data of top10) {
      embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
    }
    return message.channel.send({embed});
  }

  // This looks super simple because it's calling upon the prepared statement!
  client.setScore.run(score);

     /* Challenge Stuff */
     let challenge_role = guild.roles.cache.find(r => r.name === 'Participants');
     let challenge_channel = guild.channels.cache.find(c => c.name === 'challenges');
     if(!challenge_channel) {
      guild.channels.create('Challenges', {
          type: 'text',
          reason: 'Sakura Moon needed a Challenges channel for the Challenges handler.',
      }).then(console.log('The Challenges channel did not exist so I created one!')).catch(console.error);
  }
     let submissions_channel = guild.channels.cache.find(ch => ch.name === 'submissions');
     if(!submissions_channel) {
      guild.channels.create('Submissions', {
          type: 'text',
          reason: 'Sakura Moon needed a Submissions channel for the Challenges handler.'
      }).then(console.log('The Submissions channel did not exist so I created one!')).catch(console.error);
  }
  
  let participants = guild.members.cache.filter(member => member.roles.cache.find(role => role == challenge_role)).map(mems => {
    connection.query(
        `INSERT INTO Challenges (guildId, player, challengeAnnouncementsChannel, submissionsDumpChannel) VALUES (?, ?, ?, ?)`,
        [guild.id, mems.id, challenge_channel.id, submissions_channel.id]
      );
    });
  });

client.on('error', function (err) {
  console.log('Global error handler called:\n');
  if(err) {console.log(err);}
});

client.on('message', async message => {
  if (!message.content.startsWith(config.client.prefix) || message.author.bot) return;
  
  const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return; 

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});


 /* REACTION ROLES STUFFS
  client.on("messageReactionAdd", (reaction, user) => {
    if (user.bot == true) return;
    if (reaction.message.channel.name != "suggestions") return;
    let emojis = ["👍", "👎"];
    if (!emojis.includes(reaction.emoji.name)) return reaction.remove();
  });
*/
  (async () => {
    connection = await require('./database.js');
    await client.login(config.client.token);
  })();
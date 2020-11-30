const cData = require('../contestData');

module.exports = {
    name: 'contest-leaderboard',
    description: 'Prints the leaderboard for the contest.',
    aliases: ['cleaderboard', 'cl', 'whoswinning', 'cleads'],
    usage: '++contest-leaderboard',
    inHelp: 'yes',
    execute(message, args) {
  
        let leaderboardMessage = '```';
        let posMessage = 'You haven\'t participated yet!';
        let count = 1;
        for (let user of Object.values(contestData.participants).sort((a, b) => b.score - a.score)) {
            leaderboardMessage += (count++) + '. ' + user.name + ' '.repeat(17 - user.name.length) + user.score + '\n';
            if (user.name == message.author.username) {
                posMessage = `Position \`${count-1}\` with \`${user.score}\` points.\nYou have \`${user.pending}\` pending submission(s).`;
            }
        }
        leaderboardMessage += '```';
        let embed = new Discord.MessageEmbed()
        .setColor("#22a800")
        .setTitle("Contest Leaderboard")
        .addField("Scores", leaderboardMessage)
        .addField("Your position", posMessage);
    
        message.channel.send(embed);

    },
  };
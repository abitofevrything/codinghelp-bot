const cData = require('../contestData');
const Discord = require("discord.js");

module.exports = {
    name: 'addpoints',
    description: 'Adds points to a user\'s score and marks the specified challenge as reviewed, stopping the user from submitting new answers.\n**Note:** You must have MANAGE_GUILD permissions to run this command.',
    aliases: ['addp', 'ap', 'morepoints'],
    usage: '++addpoints [user] [challenge number] [points]',
    inHelp: 'yes',
    execute(message, args) {
  
        if (!message.member.roles.cache.has("782276070850035752")) {
            message.channel.send(":x: You can't do that!");
        } else {
            let contestData = cData.getData();
            console.log(JSON.stringify(contestData));
            if (contestData.participants[args[0]].submissions[args[1]].pending) {
                contestData.participants[args[0]].score += Number.parseInt(args[2]);
                contestData.participants[args[0]].pending--;
                contestData.participants[args[0]].submissions[args[1]].pending = false;
                cData.setData(contestData);
                message.channel.send(`Sucessfully added ${args[2]} points to ${args[0]}'s score and marked their submission for challenge #${args[1]} as reviewed.\nThey can no longer submit answers for this challenge.`);
            } else {
                message.channel.send(`:x: That submission has already been reviewed!`);
            }
        }

    },
  };
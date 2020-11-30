const cData = require('../contestData');

module.exports = {
    name: 'submit',
    description: 'Command to submit answers to challenges.',
    aliases: ['submit-challenge', 'sc', 'answer', 'done'],
    usage: '++submit [challenge day number] [submission text]',
    inHelp: 'yes',
    execute(message, args) {
  
    //Delete the message so that other people can't see the person's answer
    message.delete();

    //Check if the date is valid
    if (isNaN(args[0]) || args[0] < 1) {
        message.channel.send(":x: Please enter a valid date!");
        return;
    }
    if (args[0] > new Date().getDay() || 11/* change to 10 for testing if needed - this will prevent users from submitting answers before december*/ > new Date().getMonth()) {
        message.channel.send(":x: That challenge isn't out yet!");
        return;
    }


    let user = message.author.username;
    if (contestData.participants[user] == undefined) {
        contestData.participants[user] = {
            name : user,
            score : 0,
            pending : 0,
            submissions : []
        };
    }
    if (contestData.participants[user].submissions[args[0]] == undefined) {
        contestData.participants[user].pending++;
    } else if (!contestData.participants[user].submissions[args[0]].pending) {
        message.channel.send(":x: Your submision has already been reviewed. You cannot resubmit an answer for this challenge!");
        return;
    }

    contestData.participants[user].submissions[args[0]] = {};
    contestData.participants[user].submissions[args[0]].submissionText = args.splice(1).join(" ");
    contestData.participants[user].submissions[args[0]].pending = true;

    if (contestData.participants[user].submissions[args[0]].message) {
        contestData.participants[user].submissions[args[0]].message.delete();
    }
    message.channel.send("@" + user + ", your submission for day " + args[0] + " has been added!\nIf you wish to update your submission, simply rerun this command. This won't work once your submission has been reviewed.");

    message.guild.channels.cache.find(channel => channel.id == CHALLENGE_SUBMISSIONS_DUMP_CHANNEL).send(`${user} submitted an answer for challenge #${args[0]}! Submission : \n${contestData.participants[user].submissions[args[0]].submissionText}\n\nRun \`!addpoints ${user} ${args[0]} [number of points]\` to award this user points for this challenge`);

    updateFile();

    },
  };
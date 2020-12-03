const cData = require('../contestData');
const Discord = require("discord.js");

module.exports = {
    name: 'addchallenge',
    description: 'Allows Christmas Mods to add challenges.\n**Note:** You must have MANAGE_GUILD permissions to run this command.',
    aliases: ['addc', 'ac', 'newchallenge', 'nc'],
    usage: '++addchallenge [day number] [challenge title]|[challenge description]',
    inHelp: 'yes',
    execute(message, args) {
  
        if (!message.member.roles.cache.has("782276070850035752")) {
            message.channel.send(":x: You can't do that!");
        } else {
            let titleDesc = args.splice(1).join(" ").split("|");
            let contestData = cData.getData();
            contestData.challenges[args[0]] = {
                title : titleDesc[0],
                description : titleDesc[1],
                sent : false
            }; 
            cData.setData(contestData);
            message.channel.send("Succesfully added challenge for day " + args[0] + ".\nIt will be published automatically on that day (when a message is sent anywhere on the server)");
        }
    },
  };
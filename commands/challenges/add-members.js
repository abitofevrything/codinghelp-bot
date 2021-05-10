const Discord = require('discord.js');
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'add-members',
    description: 'This adds Challenge Participants to the Database. **Note:** Only mods can run this command!',
    aliases: ['addppl', 'addparticipants', 'addchallengers', 'ap', 'add-participants'],
    usage: '!add-members',
    async execute (message, args) {

        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
            return;
        } else {
            let joinersRole = message.guild.roles.cache.find(r => r.name === "Participants") || "none";
            if(joinersRole === "none") {
                message.reply('You need to create a role named \`Participants\` first and give it to users first before you run this command. If you have a role like this, make sure it is named \`Participants\` exactly like that or else this command will not work! If you still have issues, please report this to my developer!');
                return;
            } else {
                const Role = message.guild.roles.cache.find(role => role.name == "Participants");
                const Members = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.id); // array of IDs
                var Memberslength = Members.length;
                for (var i = 0; i < Memberslength; i++) {
                    const members = Members[i];
                    await connection.query(
                        `INSERT INTO Challenges (guildId, player) VALUES (?, ?);`,
                        [message.guild.id, members]
                    );
                }
                const name = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.tag).join('\n'); //works
                let embed = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle(`Users with the \`Participants\` role`)
                    .setDescription(`${name}`)
                    .setFooter('Only users that have been online at least once since this bot was last rebooted will be shown here and only a maximum of 2,000 members will appear. Other users can be added using the s.manualadd command.');
                message.channel.send(embed);               

            }
        }    

    }
}
const Discord = require("discord.js");

module.exports = {
    name: 'chk-invites',
    description: 'Used to check the number of invites a user has.',
    aliases: ['check-invites', 'referrals', 'referred'],
    usage: '.chk-invites @username or ID',
    inHelp: 'yes',
    execute(message, args) {

        const userInvites = message.guild.fetchInvites().then(invites => {
                const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

                // user isn't mentioned
                if(!user) {
                    message.channel.send('You need to specificy a user via mention or the ID.');
                    message.delete();
                    return;
                }

                const useAmount = invites.find(invite => invite.inviter.id === user.id).uses;

                // otherwise...
                if (user) { 
                    let usr = message.mentions.members.first();

                    // Undefined Embed
                    const unEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle(':tools: Checking invites...')
                    .setDescription(`${usr} has 0 invites.`)

                    // defined embed
                    const defEmbed = new Discord.MessageEmbed()
                    .setColor('#008080')
                    .setTitle(':tools: Checking invites...')
                    .setDescription(`${usr} has ${useAmount} invites.`)

                    if (useAmount === undefined) {
                        message.channel.send(unEmbed);
                        console.log('undefined invites')
                    } else {
                        message.channel.send(defEmbed);
                        console.log('defined invites')
                    }
                }

        }); // end then     
  }, // end execute
  
}; // end module.exports
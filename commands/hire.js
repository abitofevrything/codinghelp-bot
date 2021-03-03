module.exports = {
    name: 'requests', // name the command something
    description: 'Refers people to the request-coders channel to hire someone.', // Describe your command; shows this with the help command
    aliases: ['hire', ''], // Include if you have other names you want to use for this command as well.
    usage: '++hire @username or user ID',
    inHelp: 'yes',
    execute(message, args) {
  
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
      if(!user) {
        message.channel.send('You need to specificy a user via mention or the ID.');
        message.delete();
        return;
      }
      else { 
        let usr = message.mentions.members.first();
        usr.send(`Hey, ${usr}!` + ' It looks like you are requesting for someone to help you individually. This question is better answered at <#756992144170024991>. Please repost it there.');
      }
      message.channel.bulkDelete(1);
      message.channel.send(`📨 Hey, ${user} I just sent you a DM about requesting coders! Please check it!`);
    },
    
  };
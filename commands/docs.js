module.exports = {
    name: 'docs', // name the command something
    description: 'Sends the user to check out our docs on our website.', // Describe your command; shows this with the help command
    aliases: ['useful-links'], // Include if you have other names you want to use for this command as well.
    usage: '++docs @username or user ID',
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
             message.channel.send(`Hey, ${usr}!` + 'It looks like we have already answered this on our website. Please check it out here: https://codinghelp.site/');
      }
      message.channel.bulkDelete(2);

    },
    
  };
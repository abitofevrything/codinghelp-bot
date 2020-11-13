module.exports = {
    name: 'wiki', // name the command something
    description: 'Refers people to the wiki for their questions.', // Describe your command; shows this with the help command
    aliases: ['knowledgebase', 'kb', 'site'], // Include if you have other names you want to use for this command as well.
    usage: '++wiki @username or user ID',
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
             message.channel.send(`Hey, ${usr}!` + ' We aren\'t sure if you knew this, but we have a wiki! It answers a lot of the questions we get asked here! Check it out here: https://codinghelp.site/');
      }
      message.channel.bulkDelete(1);
    },
    
  };
module.exports = {
    name: 'mods',
    description: 'Refers people to Modmail bot.',
    aliases: ['modmail', 'mod'],
    usage: '++mods @username or user ID',
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
             message.channel.send(`Hey, ${usr}!` + ' Rule 4 states: Please do not ping or message the mods directly. If you would like to contact the mods, please message <@754368625216978965> and we will get back to you shortly.');
      }
      message.channel.bulkDelete(2);
    },
    
  };
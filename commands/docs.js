module.exports = {
    name: 'docs',
    description: 'Sends the user to check out our docs on our website.',
    aliases: ['useful-links'],
    usage: '++docs @username or user ID',
    inHelp: 'yes',
    execute(message, args) {
  
      usr.send(`Hey, ${usr}!` + ' It looks like we have already answered this on our website. Please check it out here: https://codinghelp.site/');
      message.channel.bulkDelete(2);

    },
    
  };
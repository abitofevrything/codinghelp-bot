const bot = require('../../config/bot.json');

module.exports = {
    name: 'code',
    description: 'Refers user to our coding.help[ ] for additional if they would like to learn how to code.',
    execute(interaction) {

        interaction.reply({ content: `Hey! Not sure if you knew this but you can visit coding.help[ ] to learn how to code. This is everywhere you can visit us:\n\nWebsite: ${bot.website}\nSubreddit: ${bot.reddit}\nDiscord Server: ${bot.discord}` });
    },

};
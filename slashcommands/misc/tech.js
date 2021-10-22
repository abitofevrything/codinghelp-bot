module.exports = {
    name: 'tech',
    description: 'Refers user to the Techway Server for additional technical help.',
    type: 'STRING',
    execute(interaction) {

        interaction.editReply({ content: 'Hey! Not sure if you knew this but you can visit the Techway server for additional help. Here is the invite link: https://discord.gg/cBUetVq', ephermal: true });
    },

};
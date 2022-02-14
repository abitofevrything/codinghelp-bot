module.exports = {
    name: 'forum',
    description: 'Sends you a link to our forum.',
    execute(interaction) {

        interaction.editReply({ content: 'You wanted a link to our forum? Check it out here: https://codinghelp.site/\nIt has tons of tutorials and pages on how to do very basic coding.If you are interesting in writing a few articles for us, you can join the team via the link. Have a good day/evening/night, wherever you are in the world!' });
    },

};
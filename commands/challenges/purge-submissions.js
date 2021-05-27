const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'purge-submissions',
    description: 'This gives **mods** the ability to purge all submissions from the submissions database. *Note:* This does *not* delete them from the channel within discord.',
    aliases: ['purges', 'psubmissions', 'psubs', 'purgesubs', 'deletesubs', 'delete-subs'],
    usage: '++purge-submissions',
    example: '++purge-submissions',
    inHelp: 'yes',
    async execute (message, args) {

        let role = message.member.roles.cache.has('839863262026924083') || message.member.roles.cache.has('718253309101867008') || message.member.roles.cache.has('846074806788685836');
        if(!role){ 
            message.channel.send('You don\'t have the `Challenge Mods` role so you can\'t use this command.');
            return;
        } else {
            
            connection.query(
                `DELETE FROM Submissions WHERE guildId = ?;`,
                [message.guild.id]
            );
            message.reply('I have deleted all of the submissions from the submissions database. If you would like to remove them from the Discord Channel, you can run \`s.purge [number 2-100]\` in that channel.');


        }    

    }
}
const connection = require('/root/codinghelp-bot/database.js');


module.exports = {
    name: 'purge-submissions',
    description: 'This gives **mods** the ability to purge all submissions from the submissions database. *Note:* This does *not* delete them from the channel within discord.',
    aliases: ['purges', 'psubmissions', 'psubs', 'purgesubs', 'deletesubs', 'delete-subs'],
    usage: '++purge-submissions',
    example: '++purge-submissions',
    inHelp: 'yes',
    async execute (message, args) {

        if(!message.member.roles.cache.has('839863262026924083') ){ 
            message.channel.send('You can\'t use this command, only mods can use this command. If you are a mod and you are seeing this, it is because only users with the \`MANAGE_MESSAGES\` permission can use this command.');
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
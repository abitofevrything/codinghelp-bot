module.exports = {
    name: 'bin', // name the command something
    description: 'Tells people a few places they could go to share long pieces of code.', // Describe your command; shows this with the help command
    aliases: ['long-code', 'external-share'], // Include if you have other names you want to use for this command as well.
    usage: '++bin',
    inHelp: 'yes',
    execute(message, args) {
  
    message.channel.send(`To share long code snippets use a service like https://gist.github.com/, https://hasteb.in/, https://sourceb.in/, https://jsfiddle.net/, https://codeshare.io/ or https://pastebin.com/ instead of uploading files or posting them as code blocks.`);
    },
    
  };
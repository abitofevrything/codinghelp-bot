module.exports = {
	name: 'coinflip',
	description: 'Flips a coin for heads or tails',
	aliases: ['flip', 'heads', 'tails'],
	usage: '++coinflip',
	example: '++coinflip or ++flip',
	inHelp: 'yes',
	execute(message, args) {
    function doRand() {
      const rand = ['HEADS!', 'TAILS!'];
      return rand[Math.floor(Math.random()*rand.length)];
    }
    const embed = {
      color: '#C977BB',
      title: 'You got...',
      description: doRand(),
      timestamp: new Date()
    };
    message.channel.send({ embeds: [embed] })
  },
};
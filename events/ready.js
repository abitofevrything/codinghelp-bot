const BaseEvent = require('../BaseEvent.js');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    async run(bot, message) {
        console.log(bot.user.tag + ' has logged in.');
    }
}
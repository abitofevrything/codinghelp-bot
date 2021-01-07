const BaseEvent = require('../BaseEvent.js');

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(bot, message) {
        console.log('message event emitted');
    }
}
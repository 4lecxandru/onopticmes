'use strict';
module.exports = (bot) => {
  bot.on('message', (payload, chat, data) => {
    const text = payload.message.text;
    if (data.captured) { return; }
    chat.say('Nu am fost programat sa raspund la acest mesaj');
  });
};

'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
  accessToken: "EAARZAGWah0CcBAJgFIrGKGJunu5tPozbO9IZAToSmpJeNZCGtwUWhSDkRtNFjoqlQygtI9vT4EYAo7t5iz4vfy2OSaiFatqlfblgnPzZCp1ZCp3uU2Tfy0ZAgvgcaGlxV8oevz2EP3lcTLWSPEV8WRbs8pZAwCg8SB637TZCt0GxZC6Q3XVzZBXEe8",
  verifyToken:"brooooooooooooooo",
  appSecret: "19e2da46ef6c1e2c62579c3e074125a3"

});

bot.on('message', (payload, chat, data) => {
  const text = payload.message.text;
  if (data.captured) { return; }
  chat.say('Nu am fost programat sa raspund la acest mesaj');
});

const askName = (convo) => {
  convo.ask(`Hello! What's your name?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('name', text);
    convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
  });
};

const askFavoriteFood = (convo) => {
  convo.ask(`What's your favorite food?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('food', text);
    convo.say(`Got it, your favorite food is ${text}`).then(() => askGender(convo));
  });
};

const askGender = (convo) => {
  convo.ask((convo) => {
    const buttons = [
      { type: 'postback', title: 'Male', payload: 'GENDER_MALE' },
      { type: 'postback', title: 'Female', payload: 'GENDER_FEMALE' },
      { type: 'postback', title: 'I don\'t wanna say', payload: 'GENDER_UNKNOWN' }
    ];
    convo.sendButtonTemplate(`Are you a boy or a girl?`, buttons);
  }, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('gender', text);
    convo.say(`Great, you are a ${text}`).then(() => askAge(convo));
  }, [
    {
      event: 'postback',
      callback: (payload, convo) => {
        convo.say('You clicked on a button').then(() => askAge(convo));
      }
    },
    {
      event: 'postback:GENDER_MALE',
      callback: (payload, convo) => {
        convo.say('You said you are a Male').then(() => askAge(convo));
      }
    },
    {
      event: 'quick_reply',
      callback: () => {}
    },
    {
      event: 'quick_reply:COLOR_BLUE',
      callback: () => {}
    },
    {
      pattern: ['yes', /yea(h)?/i, 'yup'],
      callback: () => {
        convo.say('You said YES!').then(() => askAge(convo));
      }
    }
  ]);
};

const askAge = (convo) => {
  convo.ask(`Final question. How old are you?`, (payload, convo, data) => {
    const text = payload.message.text;
    convo.set('age', text);
    convo.say(`That's great!`).then(() => {
      convo.say(`Ok, here's what you told me about you:
      - Name: ${convo.get('name')}
      - Favorite Food: ${convo.get('food')}
      - Gender: ${convo.get('gender')}
      - Age: ${convo.get('age')}
      `);
      convo.end();
    });
  });
};

bot.hear('exemplu1', (payload, chat) => {
  chat.conversation((convo) => {
    convo.sendTypingIndicator(1000).then(() => askName(convo));
  });
});

bot.hear('duhul', (payload, chat) => {
  chat.say('Duhul din lampă:', { typing: true }).then(() => (
    chat.say({
      text: 'Alege o dorință',
      quickReplies: ['O arăboaică', 'Lamborghini', 'Aur', 'Elder Scrolls 6']
    })
  ));
});


bot.start();

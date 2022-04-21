'use strict';
const BootBot = require('bootbot');
const config = require('config');
const port = process.env.PORT || 3000;

const bot = new BootBot({
  accessToken: "EAARZAGWah0CcBAJOOVXIsrgFvZALvTUSdbfsmy5d4QJXJ91gWai4pGjRXpu5fgWh7FCSgNplKlM63X6XbS0JjJjTojUzjfLKXceIxk8p2JSpLadSOia6ADhzOoiBw6txSGY1uzBLuSS5APSNz5Nxz970uLXr3mpBzH3cFCmZAwAftyfjZA9K",
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

bot.hear('firma', (payload, chat) => {
  chat.say('Optica medicala si oftamologie Ochelari de vedere adulti si copii Ochelari de soare adulti si copii. ', { typing: true }).then(() => (
    chat.say({
      text: 'Descoperiti mai multe:',
      quickReplies: ['optica','rame', 'website', 'contact']
    })
  ));
});

bot.hear('optica', (payload, chat) => {
  chat.say('Oferim cele mai bune servicii in raport calitate-pret ', { typing: true }).then(() => (
    chat.say({
      text: 'Descoperiti mai multe:',
      quickReplies: ['firma','rame', 'website', 'contact']
    })
  ));
});

bot.hear('optica', (payload, chat) => {
  chat.say('Avem o selectie de rame variata, atat ca design cat si pret ', { typing: true }).then(() => (
    chat.say({
      text: 'Descoperiti-le pe onoptic.ro'
    })
  ));
});

bot.hear('website', (payload, chat) => {
  chat.say('Mai multe detalii pe onoptic.ro' , { typing: true })
});

bot.hear('contact', (payload, chat) => {
  chat.say('Ne puteti gasi pe strada Str. Viilor 52, Cluj-Napoca. Program L-V 9-19  S 10-14 . Programare la telefon: 0786442236' , { typing: true })
});


bot.start();

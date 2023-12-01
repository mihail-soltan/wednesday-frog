const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia, } = require('whatsapp-web.js');
const cron = require('node-cron');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', async () => {
  console.log('Client is ready!');
  // console.log(await client.getCommonGroups("40766573851"))
  //Ah, yes, group chat 40765569870-1509961055@g.us

  client.getChats().then(chats => {
    chats.forEach(chat => {
      if (chat.isGroup) {
        console.log(chat.name, chat.id._serialized);
      }
    });
  });
});

client.on('message', async (message) => {
  console.log(message.body)
  if (message.body.toLowerCase() === 'wednesday') {
    //get media from url
    const media = await MessageMedia.fromUrl(
      'https://ih1.redbubble.net/image.2405955082.2337/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
    );

    //replying with media
    client.sendMessage(message.from, media, {
      caption: 'It is Wednesday, my dudes! 🐸🐸🐸',
    });
  }
});

const sendWednesdayFrog = async () => {
  const media = await MessageMedia.fromUrl(
    'https://ih1.redbubble.net/image.2405955082.2337/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'
  );
  await client.sendMessage("40765569870-1509961055@g.us", media, {
    caption: 'It is Wednesday, my dudes! 🐸🐸🐸',
  })
}
cron.schedule('0 10 * * 3', () => {
  // Your code to send a message
  sendWednesdayFrog()
});
// console.log(client.getChats())
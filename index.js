const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready' ,() => {
    console.log('Ready')
});

client.on('message', message => { 
    console.log(message.content);
    if(message.content === '!creeper'){
        message.channel.send('AWW MAN!');
    }
})

client.login('NjA2ODYxNzI5NDc3MDMzOTg0.XURUIg.9W5fzCMchPWVNL-8g4upcfGT_r4');
// NodeJS file handleing
const fs = require('fs');
// Adds DiscordJS
const Discord = require('discord.js');
// Adds the config file (check the discord for more info)
const { prefix, token } = require('./config.json');
// makes the client object
const client = new Discord.Client();
// gets all the avalible comands
client.commands = new Discord.Collection();
// parses all the filenames for querying
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// adds all the commands in the 'commands' folder so they can be executed
for (const file of commandFiles) {
    const command = require('./commands/${file}');
    client.commands.set(command.name, command);
}
// tells us the bot is ready
client.once('ready', () => {
    console.log('Ready');
})
// grabs the message from the user
client.on('message', message => {
    // checks if the message starts with the identifier
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // parses the command into command name and arguments
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    // checks if the command exists
    if(!client.commands.has(command)) return;
    // attempts to run the command
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute your command')
    }

client.once('ready' ,() => {
    console.log('Ready')
});

client.on('message', message => { 
    console.log(message.content);
    if(message.content === '!creeper'){
        message.channel.send('AWW MAN!');
    }
})

client.login('token here');
})
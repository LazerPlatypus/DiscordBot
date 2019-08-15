const fs = require('fs'); // loads filesystem
const Discord = require('discord.js'); // loads discord.js
const { prefix, token } = require('./config.json'); // loads our config file

const client = new Discord.Client(); // makes the client
client.commands = new Discord.Collection(); // makes a collection for our commands to go in
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name
var guildConf = require('./prefixes.json');

// populates the collection of commands using the filenames
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// tells us the bot is ready
client.once('ready', () => {
    console.log('Ready');
})

// dynamic command handleing
client.on('message', async message => {

    //define prefix
    //make sure user is authorzied to use the command
    //have user input prefix by !prefix {userselectedmessage}
    
    // exits the method if the message doesn't start with the prefix 
    // i.e.: the message isn't addressed to the bot
    // prefix undefined when the prefix changing code is below this line, undefined when it is above
    if (!message.content.startsWith(prefix) || message.author.bot) return;


    
    // breaks the message into a command, followed by arguments
    const args = message.content.slice(prefix.length).split(/ +/);

    // makes the command name lowercase
    const command = args.shift().toLowerCase();
    // exits the method if the command doesn't exist in our collection of commands
    if(!client.commands.has(command)) return;

    // attempts to run the command
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute your command')
    }

    

});

// check out the 'commands' folder to see how I ported this command over there.

client.login(token);

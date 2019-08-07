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

client.on('message', message => { 
    console.log(message.content);
    if(message.content === '!creeper'){
        message.channel.send('AWW MAN!');
    }
})

//import System.IO;

function readFile(filename){
    // read from filename
    var sr = new StreamReader(Application.dataPath + "/" + fileName);
    var fileContents = sr.ReadToEnd();
    sr.Close();
    // put data from filename into a variable
    var mydata = fileContents.Split("\n"[0]);
    // pick a random number between 1 and 10
    var myrandom = Random.Range(1,10);
    return(mydata[myrandom]);
}

client.on('message', message => { 
    console.log(message.content);
    if(message.content === '!npc-adult'){
        message.channel.send('you have made an npc');
        isAdventurer = false;
        str = Math.floor((Math.random() * 18) + 3);
        dex = Math.floor((Math.random() * 18) + 3);
        int = Math.floor((Math.random() * 18) + 3);
        con = Math.floor((Math.random() * 18) + 3);
        wis = Math.floor((Math.random() * 18) + 3);
        cha = Math.floor((Math.random() * 18) + 3);
        Age = Math.floor((Math.random() * 127) + 14);
        randnum = Math.floor((Math.random() * 5) + 1);
        if(randnum == 1){
            isAdventurer = true;
        }
        if(isAdventurer){
            npcclass = readFile("classes.txt")
        }
        if(!isAdventurer){
            npcjob = readFile("jobs.txt")
        }
        firstname = readFile("fnames.txt");
        lastname = readFile("lnames.txt");
        race = readFile("races.txt:");
            if(isAdventurer){
                message.channel.send('A(n)' + race + ' Adventurer appears! Their name is ' + firstname + lastname +'.\n' + 
                "Str :" + str + "\n" +
                "Dex :" + dex + "\n" +
                "Int :" + int + "\n" +
                "Con :" + con + "\n" +
                "Wis :" + wis + "\n" +
                "Cha :" + cha + "\n" +            
                "They are a " + npcclass + " and is " +  Age + " years old."
                );
            if(!isAdventurer){
                message.channel.send('A regular ' + race + ' appears! Their name is ' + firstname + lastname +'.\n' + 
                "They are a " + npcjob + " and is " +  Age + " years old.");
            }
        }


    }
})

client.login('NjA2ODYxNzI5NDc3MDMzOTg0.XUmeLQ.qzbKnd_m4BUwXlzzoBk_O6kvpVc');
})
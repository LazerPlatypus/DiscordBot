const fs = require('fs'); // loads filesystem
const Discord = require('discord.js'); // loads discord.js
const { prefix, token } = require('./config.json'); // loads our config file

const client = new Discord.Client(); // makes the client
client.commands = new Discord.Collection(); // makes a collection for our commands to go in
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name

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
client.on('message', message => {
    // exits the method if the message doesn't start with the prefix 
    // i.e.: the message isn't addressed to the bot
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

/*
client.on('message', message => { 
    console.log(message.content);
    if(message.content === '!creeper'){
        message.channel.send('AWW MAN!');
    }
})
*/

// this too has been moved to the commands folder and implemented using fs instead of a streamreader.
//import System.IO;

// function readFile(filename){
//     // read from filename
//     var sr = new StreamReader(Application.dataPath + "/" + fileName);
//     var fileContents = sr.ReadToEnd();
//     sr.Close();
//     // put data from filename into a variable
//     var mydata = fileContents.Split("\n"[0]);
//     // pick a random number between 1 and 10
//     var myrandom = Random.Range(1,10);
//     return(mydata[myrandom]);
// }

// client.on('message', message => { 
//     console.log(message.content);
//     if(message.content === '!npc-adult'){
//         message.channel.send('you have made an npc');
//         isAdventurer = false;
//         str = Math.floor((Math.random() * 18) + 3);
//         dex = Math.floor((Math.random() * 18) + 3);
//         int = Math.floor((Math.random() * 18) + 3);
//         con = Math.floor((Math.random() * 18) + 3);
//         wis = Math.floor((Math.random() * 18) + 3);
//         cha = Math.floor((Math.random() * 18) + 3);
//         Age = Math.floor((Math.random() * 127) + 14);
//         randnum = Math.floor((Math.random() * 5) + 1);
//         if(randnum == 1){
//             isAdventurer = true;
//         }
//         if(isAdventurer){
//             npcclass = readFile("classes.txt")
//         }
//         if(!isAdventurer){
//             npcjob = readFile("jobs.txt")
//         }
//         firstname = readFile("fnames.txt");
//         lastname = readFile("lnames.txt");
//         race = readFile("races.txt:");
//             if(isAdventurer){
//                 message.channel.send('A(n)' + race + ' Adventurer appears! Their name is ' + firstname + lastname +'.\n' + 
//                 "Str :" + str + "\n" +
//                 "Dex :" + dex + "\n" +
//                 "Int :" + int + "\n" +
//                 "Con :" + con + "\n" +
//                 "Wis :" + wis + "\n" +
//                 "Cha :" + cha + "\n" +            
//                 "They are a " + npcclass + " and is " +  Age + " years old."
//                 );
//             if(!isAdventurer){
//                 message.channel.send('A regular ' + race + ' appears! Their name is ' + firstname + lastname +'.\n' + 
//                 "They are a " + npcjob + " and is " +  Age + " years old.");
//             }
//         }


//     }
// })

client.login(token);

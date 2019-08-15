module.exports = {

    name: 'help',
    description: 'gets the user a list of the commands and their descriptions',
    
    execute(message, args){
        const fs = require('fs'); // loads filesystem
        const Discord = require('discord.js'); // loads discord.js

        commands = new Discord.Collection(); // makes a collection for our commands to go in
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name
        for (const file of commandFiles) {
            
            const command = require(`../commands/${file}`);
            message.author.send(`All Commands Start with !\n${command.name}\n${command.description}\n`);//sends a DM to the user that calls this command
        }
        
    }
}
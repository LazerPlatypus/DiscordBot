module.exports = {

    name: 'help',
    description: 'gets the user a list of the commands and their descriptions',
    
    execute(message, args){
        const fs = require('fs'); // loads filesystem
        const Discord = require('discord.js'); // loads discord.js

        commands = new Discord.Collection(); // makes a collection for our commands to go in

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name
        
        message.author.send(`All Commands Start with !`)
        for (const file of commandFiles) {
            
            const command = require(`../commands/${file}`);
            message.author.send(`${command.name}\n${command.description}\n`);//sends a DM to the user that calls this command
        }
        
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Discord DnD Bot',
            url: 'https://discord.js.org',
            author: {
                name: 'The Boys',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
                url: 'https://discord.js.org',
            },
            description: 'This bot is a DnD Gms Wet dream',
            thumbnail: {
                url: 'https://i.imgur.com/wSTFkRM.png',
            },
            fields: [
                {
                    name: 'Commands',
                    value: 'All Commands Start with !',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                },
                {
                    name: 'upload <image file>',
                    value: 'Allows the user to upload images to the bot',
                    inline: true,
                },
                {
                    name: 'show-image <image name>',
                    value: 'Allows the user to call back images that have been uploaded to the bot using the name they uploaded it with\n Call the Command without an image name will show a list of image names',
                    inline: true,
                },
                {
                    name: 'join',
                    value: 'Joins the voice channel when the user that called the bot is present',
                    inline: true,
                },
                {
                    name: 'play <url link>',
                    value: 'Plays the desired link from the URL the user submited',
                    inline: true,
                },
                {
                    name: 'leave',
                    value: 'Leaves the current voice channel',
                    inline: true,

                },
                {
                    name: 'npc-adult',
                    value: 'Creates a randomly generated NPC Adult',
                    inline: true,
                },
                {
                    name: 'dice <ammount> d<type>',
                    value: 'Rolls dice based on the ammount of dice given and which type of dice is defined',
                    inline: true,
                },
                {
                    name: 'enemy <difficulty>',
                    value: 'Spawns an enemy based on the difficulty\n Difficulties: 0, 1-8, 1-4, 1-2, 1 to 20, 21, 22, 23, 24, 30',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/wSTFkRM.png',
            },
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };
        
       message.author.send({ embed: exampleEmbed });
     
       commands.forEach(command => {
           embed.fields = embed.fields + [name = command.name]
       })
       
       
    }
}
module.exports = {

    name: 'help',
    description: 'gets the user a list of the commands and their descriptions',
    aliases: ['?'],
    guildOnly: false,
    args: false,
    cooldown: true,
    cooldowntime: 10,
    
    execute(message, args){
        // load dependencies
        const fs = require('fs');
        const Discord = require('discord.js');
        const {prefix} = require('../config.json');

        // get the commands loaded in a collection
        commands = new Discord.Collection(); // makes a collection for our commands to go in
        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // gets our commands by their name
        commandFiles.sort();
        var embeds = new Array(0);
        
        // loop through the collection, adding each command's info to the embed.
        // because each embed can only have 25 fields, we have to make a new embed element
        // in the array after 25.
        for (i = 0, j = -1; i < commandFiles.length; i++) {
            if (i % 24 == 0) {
                console.log(`made it i = ${i}, j = ${j}`);
                embeds.push(new Discord.RichEmbed);
                j++;
                embeds[j].setColor(0x0099ff);
                embeds[j].setTitle(`\nDiscord DnD Bot (page ${j+1})\nThe current prefix is: ${prefix}`);
                embeds[j].setAuthor('Nash Molstead, Jake Vella,\n Adam Holt, Daniil Baydak,\n Robert Dragoo',
                                    'https://i.imgur.com/sRNA93B.png',
                                    'https://discord.js.org');
                embeds[j].setDescription('"This bot is a D&D DM\'s wet dream" --Jake Vella, 2K19');
                embeds[j].setThumbnail('https://i.imgur.com/sRNA93B.png')
            }
            var command = require(`../commands/${commandFiles[i]}`);
            embeds[j].addField(command.name, command.description, false);
        }

        // loop through and print out each embeded item.
        embeds.forEach(embed => {
            message.author.send(embed);
        })

        // message.author.send(`All Commands Start with !`)
        // for (const file of commandFiles) {
            
        //     const command = require(`../commands/${file}`);
        //     message.author.send(`${command.name}\n${command.description}\n`);//sends a DM to the user that calls this command
        // }

        //     const exampleEmbed = {
    //         color: 0x0099ff,
    //         title: 'Discord DnD Bot',
    //         url: 'https://discord.js.org',
    //         author: {
    //             name: 'The Boys',
    //             icon_url: 'https://i.imgur.com/wSTFkRM.png',
    //             url: 'https://discord.js.org',
    //         },
    //         description: 'This bot is a DnD Gms Wet dream',
    //         thumbnail: {
    //             url: 'https://i.imgur.com/wSTFkRM.png',
    //         },
    //         fields: [
    //             {
    //                 name: 'Commands',
    //                 value: 'All Commands Start with !',
    //             },
    //             {
    //                 name: '\u200b',
    //                 value: '\u200b',
    //             },
    //             {
    //                 name: 'upload <image file>',
    //                 value: 'Allows the user to upload images to the bot',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'show-image <image name>',
    //                 value: 'Allows the user to call back images that have been uploaded to the bot using the name they uploaded it with\n Call the Command without an image name will show a list of image names',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'join',
    //                 value: 'Joins the voice channel when the user that called the bot is present',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'play <url link>',
    //                 value: 'Plays the desired link from the URL the user submited',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'leave',
    //                 value: 'Leaves the current voice channel',
    //                 inline: true,

    //             },
    //             {
    //                 name: 'npc-adult',
    //                 value: 'Creates a randomly generated NPC Adult',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'dice <ammount> d<type>',
    //                 value: 'Rolls dice based on the ammount of dice given and which type of dice is defined',
    //                 inline: true,
    //             },
    //             {
    //                 name: 'enemy <difficulty>',
    //                 value: 'Spawns an enemy based on the difficulty\n Difficulties: 0, 1-8, 1-4, 1-2, 1 to 20, 21, 22, 23, 24, 30',
    //                 inline: true,
    //             },
    //         ],
    //         image: {
    //             url: 'https://i.imgur.com/wSTFkRM.png',
    //         },
    //         timestamp: new Date(),
    //         footer: {
    //             text: 'Some footer text here',
    //             icon_url: 'https://i.imgur.com/wSTFkRM.png',
    //         },
    //     };
        
    //    message.author.send({ embed: exampleEmbed });
     
    //    commands.forEach(command => {
    //        embed.fields = embed.fields + [name = command.name]
    //    })
       
       
    }
}
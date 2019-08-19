module.exports = {
    name: 'show-image',
    description: 'displays an image that has been previously uploaded',
    execute(message, args) {

        // checks for the help identifier, doesn't run anything else if true.
        if (args[0] == "?") {
            message.channel.send('This commands allows for the retrieval of images stored by the bot\n' +
            'images can be uploaded for retireval by the \'upload\' command.\n' + 
            'usage: !show-image {name of image}\n' + 
            'if the image cannot be found, the bot will return the names of files similar to the filename given');
            return;
        }

        // load dependencies
        const fs = require('fs'); // loads filesystem
        const Discord = require('discord.js');

        // gets the filenames
        var files = fs.readdirSync('.\\uploads\\images');
        // strips the extensions for readability & comparison
        var filesNoExtensions = []
        for (i = 0; i < files.length; i++) {
            filesNoExtensions.push(files[i].split('.')[0]);
        }

        // makes the user's filename
        var fileName = args.join('\ ');

        // searches for the filename in our list of files
        var foundIndex;
        for (i = 0; i < filesNoExtensions.length && foundIndex == undefined; i++) {
            if (filesNoExtensions[i]==fileName) {
                foundIndex = i
            }
        }

        // if it was found, display that image
        if (foundIndex != undefined) {
            const embed = new Discord.RichEmbed();
            embed.setTitle(fileName);
            embed.attachFile(`uploads\\images\\${files[foundIndex]}`);
            embed.setImage(`attachment://${files[foundIndex]}`);
            message.channel.send(embed);
        // otherwise, loop through our list of images, and return names of those with similar names
        } else {
            if (fileName.trim() == ""){
                for (i = 0; i < files.length; i++) {
                    message.channel.send(`**${filesNoExtensions[i]}**`);
                }
            } 
            else {

                message.channel.send('There were no images matching the name provided. Did you mean any of these: ');
                var searchLetters = fileName.substring(0, 3);
                for (i = 0; i < files.length; i++) {
                    if (files[i].match(searchLetters)) {
                        message.channel.send(`**${filesNoExtensions[i]}**`);
                    }
                }
            }
        }
    },
};
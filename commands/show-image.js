module.exports = {
    name: 'show-image',
    description: 'Displays an Img that has been uploaded before with its command, call the command by itself for a list',
    aliases: ['si', 'show', 'image'],

    guildOnly: false,
    args: false,
    usage: '<image name>',
    cooldown: false,
    execute(message, args) {

        const st = require('..\\helperMethods\\send-text.js');

        // checks for the help identifier, doesn't run anything else if true.
        if (args[0] == "?") {
            st.clearMessage();
            st.setTitle('Show-Image - HELP');
            st.addText('This commands allows for the retrieval of images stored by the bot\n' +
            'images can be uploaded for retireval by the \'upload\' command.\n' + 
            'usage: !show-image {name of image}\n' + 
            'if the image cannot be found, the bot will return the names of files similar to the filename given');
            st.sendMessage(message.channel);
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

        const embed = new Discord.RichEmbed;
        // if it was found, display that image
        if (foundIndex != undefined) {
            const attachment = new Discord.Attachment(`uploads\\images\\${files[foundIndex]}`, files[foundIndex]);
            embed.attachFile(attachment);
            // embed.setImage(`uploads\\images\\${files[foundIndex]}`);
            message.channel.send(attachment);
            return;
        // otherwise, loop through our list of images, and return names of those with similar names
        } 
        var matches = [0, -1];
        for (i = 0; i < filesNoExtensions.length; i++) {
            if (filesNoExtensions[i].toUpperCase().includes(fileName.toUpperCase())) {
                matches[0]++;
                matches[1] = i;
            }
        }
        if (matches[0] == 1) {
            this.execute(message, filesNoExtensions[matches[1]].split(' '));
            return;
        } else if (fileName.trim() == ""){
                st.clearMessage()
                st.setTitle("Images on Server:")
                for (i = 0; i < files.length; i++) {
                    st.addText(`**${filesNoExtensions[i]}**\n`);
                }
        } else {
            st.clearMessage();
            st.setTitle('There were no images matching the name provided. Did you mean any of these: ');
            var searchLetters = fileName.substring(0, 3);
            for (i = 0; i < files.length; i++) {
                if (files[i].match(searchLetters)) {
                    st.addText(`**${filesNoExtensions[i]}**\n`);
                }
            }
        }
        if (st.text != '') {
            st.sendMessage(message.channel);
        }
    },
};
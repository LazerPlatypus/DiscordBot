module.exports = {
    name: 'upload',
    description: 'Allows the user to upload images to the bot',
    aliases: [],
    guildOnly: true,
    args: true,
    usage: '<new file name>',
    cooldown: false,
    execute(message, args) {

        const st = require('..\\helperMethods\\send-text.js');

        // check for help, dont run any other code if true.
        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Upload - HELP');
            st.addText('This command allows for the uploading of images and sounds.\n' +
            'Sounds can be retrieved using the \'play\' command\n ' +
            'Images can be retrieved using the \'show-image\' command.\n' +
            'usage: click the \'upload\' button, add the comment "!upload {desired name of file}", click send.');
            st.sendMessage(message.channel);
            return;
        }

        // load dependencies
        const Discord = require('discord.js'); // gets the discord api running
        const fs = require('fs'); // loads the filesystem
        const download = require('../helperMethods/download.js'); // gets the helper method this class needs


        // currently discord only allows 1 attachment per message.
        // but we put the attachments in an array b/c it makes it easier to access
        var Attachment = (message.attachments).array(); // makes an array of attachments from the message.

        // if there are no attachments, tell the user but dont run anything else.
        if (Attachment[0] == undefined) {
            st.clearMessage();
            st.setTitle('Upload - ERROR');
            st.addText('I didn\'t see any files uploaded!');
            st.sendMessage();
            return;
        }

        var fileURL = Attachment[0].url; // gets the url of the first attachments

        // make the name of the file by concating all the args together with escaped spaces
        var fileName = args.join(' ');

        if (fileName.match('[\\.?]')) {
            st.clearMessage();
            st.setTitle('Upload - ERROR');
            st.addText(`${fileName} is bad. the filename cannot contain periods or question marks`);
            st.sendMessage(message.channel);
            return;
        }

        // get the file extension
        var fileExtension = fileURL.split('.').pop();

        // list of the accepted image and sound extensions
        const imageExtensions = ['tif', 'tiff', 'bmp', 'jpg', 'jpeg', 'gif', 'png'];
        const soundExtensions = ['mp3', 'ogg', 'aac'];
        // list of places to put sounds or images
        const locations = ['uploads\\', 'uploads\\sounds\\', 'uploads\\images\\'];

        // the location of this file
        var location = locations[0];
        // set the location according to the filetype
        if (imageExtensions.includes(fileExtension)) {
            location = locations[2];
        } else if (soundExtensions.includes(fileExtension)) {
            location = locations[1];
        }

        // download the image to its location with the filename specified
        download.execute(fileURL, location, fileName, fileExtension, function () {
            st.clearMessage();
            st.setTitle('Upload - Success')
            st.addText(`Upload completed, the name is **${fileName}**`);
            st.sendMessage(message.channel);
            console.log(`new file uploaded, the name is ${fileName}.${fileExtension}`);
        })
    },
};

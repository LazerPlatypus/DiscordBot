module.exports = {
    name: 'upload',
    description: 'allows the user to upload files to the upload folder' +
    'from inside discord',
    execute(message, args) {
        const Discord = require('discord.js'); // gets the discord api running
        const fs = require('fs'); // loads the filesystem
        const download = require('../helperMethods/download.js'); // gets the helper method this class needs

        // currently discord only allows 1 attachment per message.
        // but we put the attachments in an array b/c it makes it easier to access
        var Attachment = (message.attachments).array(); // makes an array of attachments from the message.
        var fileURL = Attachment[0].url; // gets the url of the first attachments

        // tells the user that their upload was successfull
        download.execute(fileURL, `uploads\\${args[0]}.${fileURL.split('.').pop()}`, function () {
            message.channel.send(`Upload completed, the name is **${args[0]}**`)
            
            console.log(`new file uploaded, the name is ${args[0]}.${fileURL.split('.').pop()}`);
        })
    },
};

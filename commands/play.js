module.exports = {
	name: 'play',
	description: 'Plays the audio when called with an existing audio file',
	aliases: ['sound'],
	guildOnly: true,
	args: false,
	usage: '<file name>',
	cooldown: false,
	async execute(message, args) {

		if (args[0] == '?') {
			message.channel.send('Plays an audio file with the given name.\n'
			+'If the audio file cannot be found, this will return audio files with similar names, if there are any.\n'
			+'usage: !play <name of audio file> (no extension needed)\n'
			+'Note: you must be in an audio channel for this command to work');
			return;
		}

		// load dependencies
		const fs = require('fs'); // loads filesystem
		const Discord = require('discord.js');

		 // gets the filenames
		 var files = fs.readdirSync('.\\uploads\\sounds');
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
		 // if it was found, play that sound
		 if (foundIndex != undefined) {
			 var voiceChannel = message.member.voiceChannel;
			 if(!voiceChannel) {
				 return message.reply("Must be in voice channel to execute this command.");
			 }
			 voiceChannel.join().then(connection => {
				 const dispatcher = connection.playFile(`.\\uploads\\sounds\\${files[foundIndex]}`);
				 })
			 .catch(console.error);
			 return;
		 // otherwise, loop through our list of sounds, and return names of those with similar names
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
        } else if (fileName.trim() == ""){
                embed.setTitle("Sounds on Server:")
                for (i = 0; i < files.length; i++) {
                    embed.addField('\u200B',`**${filesNoExtensions[i]}**`);
                }
        } else {
            embed.addField('There were no sounds matching the name provided. Did you mean any of these: ','\u200B');
            var searchLetters = fileName.substring(0, 3);
            for (i = 0; i < files.length; i++) {
                if (files[i].match(searchLetters)) {
                    embed.addField('\u200B',`**${filesNoExtensions[i]}**`);
                }
            }
        }
        message.channel.send(embed);
    },
};
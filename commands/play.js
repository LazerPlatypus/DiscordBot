module.exports = {
	name: 'play',
	description: 'Plays the audio file specified as the arguement',
	aliases: ['sound'],
	guildOnly: true,
	args: true,
	usage: '<file name>',
	cooldown: false,
	async execute(message, args) {
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
		 // otherwise, loop through our list of sounds, and return names of those with similar names
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
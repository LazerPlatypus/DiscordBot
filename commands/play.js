var dispatcher;
module.exports = {
	name: 'play',
    description: 'Plays the audio file specified as the arguement',
	async execute(message, args) {
        var voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel) {
        	return message.reply("Must be in voice channel to execute this command.");
		}
		voiceChannel.join().then(connection => {
			dispatcher = connection.playFile(args[0]);
		})
		.catch(console.error);
    },
    dispatcher: this.dispatcher
};
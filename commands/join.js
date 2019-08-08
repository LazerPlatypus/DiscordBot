module.exports = {
	name: 'join',
	description: 'Joins the voice channel that the caller is currently in.',
	execute(message, args) {
		var voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel) {
        	return message.reply("you must be in voice channel to execute this command.");
		}
		voiceChannel.join()
		.catch(console.error);
	},
};
module.exports = {
	name: 'join',
	description: 'Joins the voice channel that the caller is currently in.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {
		var voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel) {
        	return message.reply("you must be in voice channel to execute this command.");
		}
		voiceChannel.join()
		.catch(console.error);
	},
};
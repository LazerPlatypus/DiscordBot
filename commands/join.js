module.exports = {
	name: 'join',
	description: 'Joins the voice channel that the caller is currently in.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {

		if (args[0] == '?') {
			message.channel.send('This command makes me join whatever voice channel you are currently in\n'
			+'usage: !join (no args needed)\n'
			+'if you are not in a voice channel, this command will not work.');
			return;
		}

		var voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel) {
        	return message.reply("you must be in voice channel to execute this command.");
		}
		voiceChannel.join()
		.catch(console.error);
	},
};
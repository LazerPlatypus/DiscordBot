module.exports = {
	name: 'leave',
	description: 'Leaves the voice channel.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {

		if (args[0] == '?') {
			message.channel.send('this command removes me from the voice channel you are currently in.\n'
			+'usage: !leave (no args needed)\n'
			+'If you or I am not in a voice channel, this command will not work');
			return;
		}

		if(message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
            message.reply('I must be in a voice channel to execute this command.')
        }
	},
};
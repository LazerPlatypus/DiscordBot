module.exports = {
	name: 'leave',
	description: 'Leaves the voice channel.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {

		const st = require('..\\helperMethods\\send-text.js');

		if (args[0] == '?') {
			st.clearMessage();
			st.setTitle('Leave - HELP');
			st.addText('this command removes me from the voice channel you are currently in.\n'
			+'usage: !leave (no args needed)\n'
			+'If you or I am not in a voice channel, this command will not work');
			st.sendMessage(message.channel);
			return;
		}

		if(message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
			st.clearMessage();
			st.setTitle('Leave - ERROR');
			st.addText('I must be in a voice channel to execute this command.');
			st.sendMessage(message.channel);
			return;
        }
	},
};
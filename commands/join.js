module.exports = {
	name: 'join',
	description: 'Joins the voice channel that the user is in.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {

		const st = require('..\\helperMethods\\send-text.js');

		if (args[0] == '?') {
			st.clearMessage();
			st.setTitle('Join - HELP');
			st.addText('This command makes me join whatever voice channel you are currently in\n'
			+'usage: !join (no args needed)\n'
			+'if you are not in a voice channel, this command will not work.');
			st.sendMessage(message.channel);
			return;
		}

		var voiceChannel = message.member.voiceChannel;
    	if(!voiceChannel) {
			st.clearMessage();
			st.setTitle('Join - ERROR');
			st.addText(`you must be in voice channel to execute this command.`);
			st.sendMessage(message.channel);
			return;
		}
		voiceChannel.join()
		.catch(console.error);
	},
};
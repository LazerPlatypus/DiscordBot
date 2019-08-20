module.exports = {
	name: 'leave',
	description: 'Leaves the voice channel.',
	aliases: [],
	guildOnly: true,
	args: false,
	cooldown: false,
	execute(message, args) {
		if(message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
        } else {
            message.reply('I must be in a voice channel to execute this command.')
        }
	},
};
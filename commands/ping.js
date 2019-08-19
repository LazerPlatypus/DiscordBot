module.exports = {
    name: 'ping',
    description: 'Ping!',
    aliases: [],
    guildOnly: true,
    args: false,
    cooldown: false,
    execute(message, args) {
        message.channel.send('Pong. ');
    },
};
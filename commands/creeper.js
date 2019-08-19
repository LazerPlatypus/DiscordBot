module.exports = {
    name: 'creeper',
    description: 'A great 2011 Minecraft parody reference which has garnered millions of view of youtube even surpassing the original song',
    aliases: [],
    guildOnly: true,
    args: false,
    cooldown: false,
    execute(message, args) {
        message.channel.send('AWW MAN!');
    },
};
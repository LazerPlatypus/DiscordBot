module.exports = {
    name: 'creeper',
    description: 'A great 2011 Minecraft parody reference which has garnered millions of view of youtube even surpassing the original song',
    aliases: [],
    guildOnly: true,
    args: false,
    cooldown: false,
    execute(message, args) {
        const Discord = require('discord.js');
        if (args[0]=='?') {
            message.channel.send('returns a great reference to a 2011 song.\nusage: !creeper (no args needed)')
        }
        let embed = new Discord.RichEmbed;
        embed.setColor(0x0099ff);
        embed.setThumbnail('https://i.imgur.com/sRNA93B.png');
        embed.addField('Creeper', 'AWW MAN!', true);
        message.channel.send(embed);
    },
};
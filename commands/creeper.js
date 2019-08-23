module.exports = {
    name: 'creeper',
    description: 'A great 2011 Minecraft parody reference which has garnered millions of view of youtube even surpassing the original song',
    aliases: [],
    guildOnly: false,
    args: false,
    cooldown: false,
    execute(message, args) {
        // load dependencies
        const Discord = require('discord.js');
        const st = require('..\\helperMethods\\send-text.js');

        if (args[0]=='?') {
            st.clearMessage();
            st.setTitle('Creeper - HELP');
            st.addText('returns a great reference to a 2011 song.\nusage: !creeper (no args needed)');
            st.sendMessage(message.channel);
            return;
        }
        
        // format the message
        st.clearMessage();
        st.addText('Aww Man');
        st.setTitle('Creeper?');
        
        
        st.sendMessage(message.channel);
    },
};
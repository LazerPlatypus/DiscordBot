module.exports = {
    name: 'spell-help',
    description: 'User types in the name of an existing spell,' +
    'and this method returns all the information about the spell',
    aliases: ['sh', 'spell-info', 'spellhelp', 'spellinfo'],
    guildOnly: true,
    args: true,
    usage: '<spell name>',
    cooldown: false,
    execute(message, args) {

        const st = require('..\\helperMethods\\send-text.js');

        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Spell-Help HELP');
            st.addText('this command returns the description of a spell\n'
            +'If I cannot find the spell you specified, I will return spells with a similar name, if any exist\n'
            +'usage: !spell-help <name of spell>');
            st.sendMessage(message.channel);
            return;
        }

        const sp = require('..\\helperMethods\\fileParser.js');
        const Discord = require('discord.js');
        var spellData = sp.execute('spell_list.txt', 10);
        var userSpellName = args.join(' ').trim().toUpperCase();
        var found = false;
        let embed = new Discord.RichEmbed;
        embed.setColor(0x0099ff);
        embed.setThumbnail('https://i.imgur.com/sRNA93B.png');
        for (i = 0; i < spellData.length && !found; i++) {
            if (spellData[i][0].toUpperCase() == userSpellName) {
                st.clearMessage();
                st.setTitle(`Name: ${spellData[i][0]}`);
                st.addText(`\n__School__: ${spellData[i][1]}\n__Class__: ${spellData[i][2]}\n__Level__: ${spellData[i][3]}\n__Casting time__: ${spellData[i][4]}\n__Range__: ${spellData[i][5]}\n__Componants__: ${spellData[i][6]}\n__Duration__: ${spellData[i][7]}\n__Description__: ${spellData[i][8]}\n__Higher levels__: ${spellData[i][9]}\n__Source__: ${spellData[i][10]}`);
                st.sendMessage(message.channel);
                st.clearMessage();
                found = true;
            }
        }
        if (!found) {
            var matches = [0, -1];
            for (i = 0; i < spellData.length; i++) {
                if (spellData[i][0].toUpperCase().includes(userSpellName)) {
                    matches[0]++;
                    matches[1] = i;
                }
            }
            if (matches[0] == 1) {
                this.execute(message, spellData[matches[1]][0].split(' '));
                return;
            }
            else {
                st.clearMessage();
                st.setTitle('I couldn\'t find a rule with that name.');
                for (i = 0; i < spellData.length; i++) {
                    if (spellData[i][0].toUpperCase().includes(userSpellName.substring(0, 3))) {
                        if (!found) {
                            st.addText('_Were you looking for one of these?_\n');
                            found = true;
                        }
                        st.addText(`**${spellData[i][0]}**\n`);
                    }
                }
            }
        }
        if (st.text != '') {
            st.sendMessage(message.channel);
        }
    },
};
module.exports = {
    name: 'spell-help',
    description: 'User types in the name of an existing spell,' +
    'and this method returns all the information about the spell',
    aliases: [],
    guildOnly: true,
    args: true,
    usage: '<spell name>',
    cooldown: false,
    execute(message, args) {

        if (args[0] == '?') {
            message.channel.send('this command returns the description of a spell\n'
            +'If I cannot find the spell you specified, I will return spells with a similar name, if any exist\n'
            +'usage: !spell-help <name of spell>');
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
                embed.setTitle(`Name: ${spellData[i][0]}`);
                embed.setDescription(`\n__School__: ${spellData[i][1]}\n__Class__: ${spellData[i][2]}\n__Level__: ${spellData[i][3]}\n__Casting time__: ${spellData[i][4]}\n__Range__: ${spellData[i][5]}\n__Componants__: ${spellData[i][6]}\n__Duration__: ${spellData[i][7]}\n__Description__: ${spellData[i][8]}\n__Higher levels__: ${spellData[i][9]}\n__Source__: ${spellData[i][10]}`);
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
            }
            else {
                embed.addField('I couldn\'t find a rule with that name.','\u200B', false);
                for (i = 0; i < spellData.length; i++) {
                    if (spellData[i][0].toUpperCase().includes(userSpellName.substring(0, 3))) {
                        if (!found) {
                            embed.addField('\u200B','_Were you looking for one of these?_');
                            found = true;
                        }
                        embed.addField('\u200B',`**${spellData[i][0]}**`);
                    }
                }
            }
        }
        if (embed.fields != undefined && embed.fields.length > 1 || embed.title != undefined) {
            message.channel.send(embed);
        }
    },
};
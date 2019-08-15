module.exports = {
    name: 'spell-help',
    description: 'user types in the name of an existing spell,' +
    'and this method returns all the information about the spell',
    execute(message, args) {
        const sp = require('..\\helperMethods\\fileParser.js');
        var spellData = sp.execute('spell_list.txt', 10);
        var userSpellName = args.join(' ').trim().toUpperCase();
        var found = false;
        for (i = 0; i < spellData.length && !found; i++) {
            if (spellData[i][0].toUpperCase() == userSpellName) {
                message.channel.send(`__Name__: ${spellData[i][0]}\n__School__: ${spellData[i][1]}\n__Class__: ${spellData[i][2]}\n__Level__: ${spellData[i][3]}\n__Casting time__: ${spellData[i][4]}\n__Range__: ${spellData[i][5]}\n__Componants__: ${spellData[i][6]}\n__Duration__: ${spellData[i][7]}\n__Description__: ${spellData[i][8]}\n__Higher levels__: ${spellData[i][9]}\n__Source__: ${spellData[i][10]}`);
                found = true;
            }
        }
        if (!found) {
            for (i = 0; i < spellData.length; i++) {
                if (spellData[i][0].toUpperCase().includes(userSpellName.substring(0, 3))) {
                    if (!found) {
                        message.channel.send('I could\'t find the spell you specified. Did you mean any of these:');
                        found = true;
                    }
                    message.channel.send(`**${spellData[i][0]}**`);
                }
            }
            if (!found) {
                message.channel.send('Sorry, I couldn\'t find a spell similar to what you specified');
            }
        }
    },
};
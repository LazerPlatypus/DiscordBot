module.exports = {
    name: 'genitem',
    description: 'returns a random item',
    aliases: [],
    guildOnly: true,
    args: true,
    usage: '<item type>',
    cooldown: false,
    execute(message, args) {
        lootClass = args[0];
        lootAmount = args[1];

        for (i = 0; i < lootAmount; i++) {
            const fs = require('fs'); // loads filesystem
            const is = require('..\\helperMethods\\itemSorter.js'); //loads the file reader method in the helpermethods folder

            const items = is.execute('.\\items.txt', lootClass);
            if (items.length < 1) {
                message.channel.send('there are no items of that class');
                return;
            }
            let itemArray = items[Math.floor(Math.random() * items.length) + 1];
            levelClass = itemArray[9];

            console.log(`loot class: ${lootClass}\nloot amout: ${lootAmount}\nlevelClass: ${levelClass}\n\n${itemArray}`);

            if (levelClass.toString().trim() == lootClass.toString().trim()) {

                let itemSubType = itemArray[5];

                if (itemSubType == 'armor') {
                    console.log('im an armor');
                    itemMstwk = itemArray[0];
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemAC = itemArray[6];
                    itemDescrpt = itemArray[8]

                    let text = itemName == '' ? '' : `A ${itemMstwk} ${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemAC == '' ? '' : ` | ${itemAC}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    message.channel.send(text);

                } else if (itemSubType == 'weapon') {
                    console.log('im an wpn');
                    itemMstwk = itemArray[0];
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemRange = itemArray[4];
                    itemDamage = itemArray[7];
                    itemDescrpt = itemArray[8];

                    let text = itemName == '' ? '' : `A ${itemMstwk} ${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemRange == '' ? '' : ` | ${itemRange}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemDamage == '' ? '' : ` | ${itemDamage}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    message.channel.send(text);

                } else if (itemSubType == 'accessory') {
                    console.log('im an accy');
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemDescrpt = itemArray[8]
                    itemAC = itemArray[6];

                    let text = itemName == '' ? '' : `${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemAC == '' ? '' : ` | ${itemAC}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    message.channel.send(text);

                } else if (itemSubType == 'item') {
                    console.log('im an item');
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemDescrpt = itemArray[8]

                    let text = itemName == '' ? '' : `${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    message.channel.send(text);

                }



            } else {
                i--;
            }

        }
    },
};
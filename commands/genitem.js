module.exports = {
    name: 'genitem',
    description: 'returns a random item',

    execute(message, args) {
        if (message.content.startsWith("!genitem ")) {
            var item = message.content.substr("!genitem ".length);
            var iarray = item.split(" ");
            lootClass = iarray[0];
            lootAmount = iarray[1];


        }

        for (i = 0; i < lootAmount; i++) {
            const fs = require('fs'); // loads filesystem
            const rf = require('..\\helperMethods\\readFile.js'); //loads the file reader method in the helpermethods folder

            newItem = rf.execute('.\\items.txt');
            var itemArray = newItem.split("|");
            levelClass = itemArray[9];

            if (levelClass == lootClass) {

                itemSubType = itemArray[5];

                if (itemSubType = 'armor') {

                    itemMstwk = itemArray[0];
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemAC = itemArray[6];
                    itemDescrpt = itemArray[8]

                    message.channel.send(`A ${itemMstwk} ${itemName} | ${itemType} | ${itemEffect} | ${itemAC} | ${itemDescrpt}`);

                } else if (itemSubType = 'weapon') {

                    itemMstwk = itemArray[0];
                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemRange = itemArray[4];
                    itemDamage = itemArray[7];
                    itemDescrpt = itemArray[8];

                    message.channel.send(`A ${itemMstwk} ${itemName} | ${itemType} | ${itemRange} | ${ itemEffect } | ${ itemDamage } | ${ itemDescrpt }`);

                } else if (itemSubType = 'accessory') {

                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemDescrpt = itemArray[8]
                    itemAC = itemArray[6];

                    message.channel.send(`A ${itemName} | ${itemType} | ${itemEffect} | ${itemAC} | ${itemDescrpt}`);

                } else if (itemSubType = 'item') {

                    itemName = itemArray[1];
                    itemEffect = itemArray[2];
                    itemType = itemArray[3];
                    itemDescrpt = itemArray[8]

                    message.channel.send(`A ${itemName} | ${itemType} | ${itemEffect} | ${itemDescrpt}`);

                }



            } else {
                i--;
            }

        }
    },
};
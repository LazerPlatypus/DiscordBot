module.exports = {
    name: 'generate-item',
    description: 'returns an item specified by the loot lookup table',
    aliases: ['gi', 'random-item', 'make-item', 'loot-gen', 'genloot'],
    args: true,
    guildOnly: false,
    usage: '<amount of loot> <value of loot>',
    cooldown: false,
    execute(message, args) {
        // load dependencies
        const is = require('..\\helperMethods\\itemSorter.js');
        const st = require('..\\helperMethods\\send-text.js');

        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Generate-Item - HELP');
            st.addText('This command will generate random loot.'+
            'You can specify the amount of loot, and the scale of \'good-ness\' of the loot.'+
            '\nusage: !generate-item <amount of loot> <scale of loot>\n'+
            'Loot scale goes from 1 to 20, and should be ~roughly equivilent to the encounter CR');
            st.sendMessage(message.channel);
            return;
        }

        let lootAmount = parseInt(args[0]);
        let lootClass = args[1];

        if(lootAmount > 10000) {
            st.clearMessage();
            st.setTitle('Generate Item - ERROR');
            st.addText('The maximum number of items that and be generated at once is 10000.');
            st.sendMessage(message.channel);
            return;
        } else if(lootAmount < 1) {
            st.clearMessage();
            st.setTitle('Generate Item - ERROR');
            st.addText('At least one item must be generated.');
            st.sendMessage(message.channel);
            return;
        } else if (!Number.isInteger(lootAmount)){
            st.clearMessage();
            st.setTitle('Generate Item - ERROR');
            st.addText('Enter the amount of loot to generate as a numerical value.');
            st.sendMessage(message.channel);
            return;
        }

        let items = is.execute('.\\items.txt', lootClass);
        if (items.length < 1) {
            st.clearMessage();
            st.setTitle('Generate Item - ERROR');
            st.addText('There are no items of that class. Valid loot scale is 1 to 20.');
            st.sendMessage(message.channel);
            return;
        }

        st.clearMessage();
        st.setTitle('Generate Item - Results');

        for (i = 0; i < lootAmount; i++) {
            console.log(`working on #${i} item of ${lootAmount}`);

            let randomItem = items[Math.floor(Math.random() * items.length)];
            let levelClass = randomItem[9];

            if (levelClass.trim() == lootClass.trim()) {
                
                let itemSubType = randomItem[5];

                if (itemSubType == 'armor') {
                    // console.log('im an armor');
                    itemMstwk = randomItem[0];
                    itemName = randomItem[1];
                    itemEffect = randomItem[2];
                    itemType = randomItem[3];
                    itemAC = randomItem[6];
                    itemDescrpt = randomItem[8];

                    let text = itemName == '' ? '' : `A ${itemMstwk} ${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemAC == '' ? '' : ` | ${itemAC}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    st.addText(text);
                    st.addText('\n');

                } else if (itemSubType == 'weapon') {
                    // console.log('im an wpn');
                    itemMstwk = randomItem[0];
                    itemName = randomItem[1];
                    itemEffect = randomItem[2];
                    itemType = randomItem[3];
                    itemRange = randomItem[4];
                    itemDamage = randomItem[7];
                    itemDescrpt = randomItem[8];

                    let text = itemName == '' ? '' : `A ${itemMstwk} ${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemRange == '' ? '' : ` | ${itemRange}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemDamage == '' ? '' : ` | ${itemDamage}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    st.addText(text);
                    st.addText('\n');

                } else if (itemSubType == 'accessory') {
                    // console.log('im an accy');
                    itemName = randomItem[1];
                    itemEffect = randomItem[2];
                    itemType = randomItem[3];
                    itemDescrpt = randomItem[8]
                    itemAC = randomItem[6];

                    let text = itemName == '' ? '' : `${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemAC == '' ? '' : ` | ${itemAC}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    st.addText(text);
                    st.addText('\n');

                } else if (itemSubType == 'item') {
                    // console.log('im an item');
                    itemName = randomItem[1];
                    itemEffect = randomItem[2];
                    itemType = randomItem[3];
                    itemDescrpt = randomItem[8]

                    let text = itemName == '' ? '' : `${itemName}`;
                    text += itemType == '' ? '' : ` | ${itemType}`;
                    text += itemEffect == '' ? '' : ` | ${itemEffect}`;
                    text += itemDescrpt == '' ? '' : ` | ${itemDescrpt}`;
                    st.addText(text);
                    st.addText('\n');

                }
            }

        }
        st.sendMessage(message.channel);
    }
}
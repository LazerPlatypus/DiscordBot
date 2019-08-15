module.exports = {

    name: 'Random Loot Generator',
    description: 'Returns qualifying items based off of a range of 20', //To be added upon this working - Return based off of difficulty index in addition to scale.



    execute(scale) {
        const FP = require('..\\helperMethods\\fileParser.js');
        var items = FP.execute('Items.txt', 11);
        var selectedItems;
        for (i = 1; i < items.length) {
            if (items[i][10] == scale) {
                selectedItems = items[i];
            }
        }
        return selectedItems;
    }
}
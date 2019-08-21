module.exports = {

    name: 'Random Loot Generator',
    description: 'Returns qualifying items based off of a range of 20', //To be added upon this working - Return based off of difficulty index in addition to scale.



    execute(fileName, scale) {
        const FP = require('..\\helperMethods\\fileParser.js');
        var items = FP.execute(fileName, 10);
        var selectedItems = new Array(0);
        items.forEach(item => {
            if (item[9].trim() == scale.toString().trim()) {
                selectedItems.push(item);
            }
        })
        console.log(selectedItems);
        return selectedItems;
    }
}
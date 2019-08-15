module.exports = {
    name: 'spell file parser',
    description: 'reads a specifically formatted file, and returns an array of all the spell information' + 
    'data should look like follows: ' + 
    'SpellName | School of Magic | Class | Level | Casting Time | Range | Components | Duration | Notes/Flavor Text | Higher Levels | Source\\n' + 
    'newlines are replaced with ~',    
    execute(filename) {
        const fs = require('fs'); // loads filesystem
        var fileContents = fs.readFileSync(filename).toString();
        var spellData = fileContents.split('\n');
        for (i = 0; i < spellData.length; i++) {
            spellData[i] = spellData[i].split('|');
            for (j = 0; j < spellData[i].length; j++) {
                spellData[i][j] = spellData[i][j].replace(/~/g, '\n');
            }
        }
        return spellData;
    }
}
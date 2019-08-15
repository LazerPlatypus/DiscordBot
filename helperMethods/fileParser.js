module.exports = {
    name: 'rule file parser',
    description: 'reads a specifically formatted file, and returns an array with a number of indexes equal' + 
    'to the input given',    
    execute(filename, cols) {
        const fs = require('fs'); // loads filesystem
        var fileContents = fs.readFileSync(filename).toString();
        var ruleData = fileContents.split('\n');
        for (i = 0; i < ruleData.length; i++) {
            ruleData[i] = ruleData[i].split('|');
            for (j = 0; j < ruleData[i].length; j++) {
                if (j < cols) {
                    ruleData[i][j] = ruleData[i][j].replace(/~/g, '\n');
                } else {
                    ruleData[i].pop();
                }
            }
        }
        return ruleData;
    }
}
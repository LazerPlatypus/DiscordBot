module.exports = {
    name: 'rule file parser',
    description: 'reads a specifically formatted file, and returns an array of all the rule information' + 
    'data should look like follows: ' + 
    'RuleName | Book Text | Notes/Examples' + 
    'newlines are replaced with ~',    
    execute(filename) {
        const fs = require('fs'); // loads filesystem
        var fileContents = fs.readFileSync(filename).toString();
        var ruleData = fileContents.split('\n');
        for (i = 0; i < ruleData.length; i++) {
            ruleData[i] = ruleData[i].split('|');
            for (j = 0; j < ruleData[i].length; j++) {
                ruleData[i][j] = ruleData[i][j].replace(/~/g, '\n');
            }
        }
        return ruleData;
    }
}
module.exports = {
    name: 'read-file',
    description: 'generates a random adult npc',
    execute(filename) {
        const fs = require('fs'); // loads filesystem
        var fileContents = fs.readFileSync(filename).toString();
        var mydata = fileContents.split('\n');
        var myrandom = Math.floor(Math.random() * (mydata.length + 1) )    
        return(mydata[myrandom].replace(/\s+/g, ' ').trim());
    }
}
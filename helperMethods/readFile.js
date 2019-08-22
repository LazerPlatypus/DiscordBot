module.exports = {
    name: 'read-file',
    description: 'reads a file and returns a random element from the file',
    execute(filename) {
        const fs = require('fs'); // loads filesystem
        var fileContents = fs.readFileSync(filename).toString();
        var mydata = fileContents.split('\n');
        var myrandom = Math.floor(Math.random() * (mydata.length) );
        return(mydata[myrandom].replace(/\s+/g, ' ').trim());
    }
}
module.exports = {
    name: 'enemy',
    description: 'generates a enemy based on difficulty',
    execute(message, args) {
    if(message.content.startsWith("!enemy ")){
        var dice = message.content.substr("!enemy ".length);
        var darray = dice.split(" ");
        amount= darray[0];
        difficulty = darray[1];
    }
        const fs = require('fs'); // loads filesystem
        const rf = require('..\\helperMethods\\readFile.js'); //loads the file reader method in the helpermethods folder
        rawenemy = rf.execute(`.\\enemies\\${difficulty}.txt`);
        





        if(true){
            message.channel.send(`${rawenemy}`);
        }
    },
};
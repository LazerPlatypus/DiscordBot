module.exports = {
    name: 'enemy',
    description: 'generates a enemy based on difficulty',
    aliases: [],
    guildOnly: false,
    args: true,
    cooldDown: false,
    execute(message, args) {
    if(message.content.startsWith("!enemy ")){
        var dice = message.content.substr("!enemy ".length);
        var darray = dice.split(" ");
        difficulty = darray[0];
    }
        const fs = require('fs'); // loads filesystem
        const rf = require('..\\helperMethods\\readFile.js'); //loads the file reader method in the helpermethods folder
        rawenemy = rf.execute(`.\\enemies\\${difficulty}.txt`);
        var enemyarray = rawenemy.split("_");
        enemyname = enemyarray[0]
        rawhealth = enemyarray[1]
        var healtharray = rawhealth.split("+")
        dicevalue = healtharray[0]
        addvalue = healtharray[1]
        var dicearray = dicevalue.split("d")
        amount = dicearray[0]
        size = dicearray[1]
        roll = 0
        for(i = 0; i < amount; i++){
            if(size == "20"){
                rolledamount = ((Math.floor(Math.random() * 20) + 1));
                roll = roll + rolledamount;
            }
            if(size == "100"){
                rolledamount = ((Math.floor(Math.random() * 100) + 1));
                roll = roll + rolledamount;
            }
            if(size == "12"){
                rolledamount = ((Math.floor(Math.random() * 12) + 1));
                roll = roll + rolledamount;
            }
            if(size == "10"){
                rolledamount = ((Math.floor(Math.random() * 10) + 1));
                roll = roll + rolledamount;
            }
            if(size == "8"){
                rolledamount = ((Math.floor(Math.random() * 8) + 1));
                roll = roll + rolledamount;
            }
            if(size == "4"){
                rolledamount = ((Math.floor(Math.random() * 4) + 1));
                roll = roll + rolledamount;
            }
            if(size == "2"){
                rolledamount = ((Math.floor(Math.random() * 2) + 1));
                roll = roll + rolledamount;
            }
        }
        health = roll
        var integera = parseInt(addvalue, 10);
        addhp = integera
        finalhp = health + addhp

        if(true){
            message.channel.send(`A(n) ${enemyname} appears with ${finalhp} health points!`);
        }
    },
};
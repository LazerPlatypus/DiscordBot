module.exports = {
    name: 'enemy',
    description: 'Generates a enemy based on difficulties 1/4, 1/2, 1/8, 1-20, and 21-24 and 30 ',
    aliases: ['npc-enemy'],

    guildOnly: false,
    args: true,
    cooldown: false,
    execute(message, args) {
        const Discord = require('discord.js');
        const st = require('..\\helperMethods\\send-text.js');
    // if(message.content.startsWith("!enemy ")){
    //     var dice = message.content.substr("!enemy ".length);
    //     var darray = dice.split(" ");
    //     difficulty = darray[0];
    // }

        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Enemy - ERROR');
            st.addText('this command generated an enemy based on a CR\n'
            +'usage: !enemy <desired cr>\n'
            +'suppored CR are: 0, 1-8, 1-4, 1-2, 1 through 24, and 30.');
            st.sendMessage(message.channel);
            return;
        }

        difficulty = args[0];
        const fs = require('fs'); // loads filesystem
        const rf = require('..\\helperMethods\\readFile.js'); //loads the file reader method in the helpermethods folder
        try {
            rawenemy = rf.execute(`.\\enemies\\${difficulty}.txt`);
        } catch (err) {
            st.clearMessage();
            st.setTitle('Enemy - ERROR');
            st.addText('CR not recognized. use the "?" argument to see how to use this command');
            st.sendMessage(message.channel);
            return;
        }
        var enemyarray = rawenemy.split("_");
        enemyname = enemyarray[0]
        rawhealth = enemyarray[1]
        var healtharray
        if(rawhealth.includes('+')) {
            healtharray = rawhealth.split("+")
        } else {
            healtharray = rawhealth.split("-")
        }
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
            st.clearMessage();
            st.setTitle('Enemy - Result');
            st.addText(`A(n) ${enemyname} appears with ${finalhp} health points!`);
            // message.channel.send(`A(n) ${enemyname} appears with ${finalhp} health points!`);
            st.sendMessage(message.channel);
        }
    },
};
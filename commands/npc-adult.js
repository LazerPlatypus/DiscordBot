module.exports = {
    name: 'npc-adult',
    description: 'generates a random adult npc',
    execute(message, args) {

        const fs = require('fs'); // loads filesystem
        const rf = require('..\\helperMethods\\readFile.js'); //loads the file reader method in the helpermethods folder
        isAdventurer = false;
        // generates stats
        str = Math.floor((Math.random() * 18) + 3);
        dex = Math.floor((Math.random() * 18) + 3);
        int = Math.floor((Math.random() * 18) + 3);
        con = Math.floor((Math.random() * 18) + 3);
        wis = Math.floor((Math.random() * 18) + 3);
        cha = Math.floor((Math.random() * 18) + 3);
        Age = Math.floor((Math.random() * 127) + 14);
        randnum = Math.floor((Math.random() * 3) + 1);
        npcHealth = Math.floor((Math.random() * 10) + 5);
        randlevel = Math.floor((Math.random() * 90) + 1);
        advLevel = 0;
        //randomly generates level
        if(randlevel > 1 && randlevel < 10){
            advLevel = 1; 
        }
        if(randlevel > 10 && randlevel < 20){
            advLevel = 2;
        }
        if(randlevel > 20 && randlevel < 35){
            advLevel = 3;
        }
        if(randlevel > 35 && randlevel < 50){
            advLevel = 4;
        }
        if(randlevel > 50 && randlevel < 60){
            advLevel = 5;
        }
        if(randlevel > 60 && randlevel < 67){
            advLevel = 6;
        }
        if(randlevel > 67 && randlevel < 73){
            advLevel = 7;
        }
        if(randnum == 1){
            isAdventurer = true;
        }
        //Generates Health based on class and level
        if(isAdventurer){
            npcclass = rf.execute("classes.txt")
            if(npcclass == "Barbarian"){
                advHealth = (Math.floor(Math.random() * 12)) + (advLevel * 7);
            }
            if(npcclass == "Paladin" || "Fighter" || "Ranger"){
                advHealth = (Math.floor(Math.random() * 10)) + (advLevel * 6);
            }
            if(npcclass == "Bard" || "Cleric" || "Druid" || "Monk" || "Rogue" || "Warlock" || "Mystic" || "Artificer"){
                advHealth = (Math.floor(Math.random() * 8)) + (advLevel * 5);
            }
            if(npcclass == "Wizard" || "Sorcerer"){
                advHealth = (Math.floor(Math.random() * 10)) + (advLevel * 4);
            }
        }
        if(!isAdventurer){
            npcjob = rf.execute("jobs.txt")
        }
        //gets names and/or jobs
        firstname = rf.execute("fnames.txt");
        lastname = rf.execute("lnames.txt");
        race = rf.execute("races.txt");
        //prints out to the console, or in this case the chat
        if(isAdventurer){
            message.channel.send(`A(n) ${race} Adventurer appears! Their name is ${firstname} ${lastname}\n
            Str: ${str}\n
            Dex: ${dex}\n
            Int: ${int}\n
            Con: ${con}\n
            Wis: ${wis}\n
            Cha: ${cha}\n
            They are a ${npcclass} and are ${Age} years old\n
            Level: ${advLevel} , Health: ${advHealth}`
            );
        }
        if(!isAdventurer){
            message.channel.send(`A regular ${race} appears!\n Their name is ${firstname} ${lastname}\n
            They are a ${npcjob} and are ${Age} years old, they also have ${npcHealth} health points.`);
        }
    },
};
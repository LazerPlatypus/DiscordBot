module.exports = {
    name: 'npc-adult',
    description: 'generates a random adult npc',
    execute(message, args) {

        const fs = require('fs'); // loads filesystem

        function readFile(filename){
            // read from filename
            var fileContents = fs.readFileSync(filename).toString();
            var mydata = fileContents.split('\n');
            var myrandom = Math.floor(Math.random() * (mydata.length + 1) )    
            return(mydata[myrandom].replace(/\s+/g, ' ').trim());
        }

        message.channel.send('you have made an npc');
        // stats?
        isAdventurer = false;
        str = Math.floor((Math.random() * 18) + 3);
        dex = Math.floor((Math.random() * 18) + 3);
        int = Math.floor((Math.random() * 18) + 3);
        con = Math.floor((Math.random() * 18) + 3);
        wis = Math.floor((Math.random() * 18) + 3);
        cha = Math.floor((Math.random() * 18) + 3);
        Age = Math.floor((Math.random() * 127) + 14);
        randnum = Math.floor((Math.random() * 5) + 1);
        if(randnum == 1){
            isAdventurer = true;
        }
        if(isAdventurer){
            npcclass = readFile("classes.txt")
        }
        if(!isAdventurer){
            npcjob = readFile("jobs.txt")
        }
        firstname = readFile("fnames.txt");
        lastname = readFile("lnames.txt");
        race = readFile("races.txt");
        if(isAdventurer){
            message.channel.send(`A(n) ${race} Adventurer appears! Their name is ${firstname} ${lastname}\n
            Str: ${str}\n
            Dex: ${dex}\n
            Int: ${int}\n
            Con: ${con}\n
            Wis: ${wis}\n
            Cha: ${cha}\n
            They are a ${npcclass} and are ${Age} years old.`
            );
        }
        if(!isAdventurer){
            message.channel.send(`A regular ${race} appears!\n Their name is ${firstname} ${lastname}\n
            They are a ${npcjob} and are ${Age} years old`);
        }
    },
};
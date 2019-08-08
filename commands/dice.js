module.exports = {
    name: 'dice',
    description: 'allows the user to roll some dice',
    execute(message, args) {
    if (message.content.startsWith("!dice ")) {
        var dice = message.content.substr("!dice ".length);
        var darray = dice.split(" ");
        amount = darray[0];
        size = darray[1];
        roll = 0
        critsuccess = 0
        critfail = 0
        for(i = 0; i < amount; i++){
            if(size == "d20"){
                rolledamount = ((Math.floor(Math.random() * 20) + 1));
                if(rolledamount == 20){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
            if(size == "d100"){
                rolledamount = ((Math.floor(Math.random() * 100) + 1));
                if(rolledamount == 100){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
            if(size == "d12"){
                rolledamount = ((Math.floor(Math.random() * 12) + 1));
                if(rolledamount == 12){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
            if(size == "d10"){
                rolledamount = ((Math.floor(Math.random() * 10) + 1));
                if(rolledamount == 10){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
            if(size == "d8"){
                rolledamount = ((Math.floor(Math.random() * 8) + 1));
                if(rolledamount == 8){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
            if(size == "d4"){
                rolledamount = ((Math.floor(Math.random() * 4) + 1));
                if(rolledamount == 4){
                    critsuccess = critsuccess + 1
                }
                if(rolledamount == 1){
                    critfail = critfail + 1
                }
                roll = roll + rolledamount;
            }
            if(size == "d2"){
                rolledamount = ((Math.floor(Math.random() * 2) + 1));
                if(rolledamount == 2){
                    critsuccess++
                }
                if(rolledamount == 1){
                    critfail++
                }
                roll = roll + rolledamount;
            }
        }
    }


        
        if(amount == 1 && critsuccess > 0){
            message.channel.send(`You have rolled a ${size} and got a Critical Success with a roll of ${roll}`);
        }
        else if(amount == 1 && critfail > 0){
            message.channel.send(`You have rolled a ${size} and got a Critical Failure with a roll of ${roll}`);
        }
        else if(amount == 1){
            message.channel.send(`You have rolled a ${size} and got a ${roll}`);

        }
        else if(amount > 1){
            message.channel.send(`You have rolled ${amount} ${size} and got a total of ${roll}\n
            there was ${critsuccess} crits and ${critfail} critical failures.`);
        }
        else{
            message.channel.send(`Make sure that your command follows the rules (!dice "amount" d"size")`);
        }
    },
};
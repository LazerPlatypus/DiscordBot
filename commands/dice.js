module.exports = {
    name: 'dice',
    description: 'Allows the user to roll dice. syntax: !dice <amount> d<type>',
    aliases: ['roll'],
    guildOnly: false,
    args: true,
    cooldown: false,
    execute(message, args) {
    const Discord = require('discord.js');
    const st = require('..\\helperMethods\\send-text.js');
    // if (message.content.startsWith("!dice ")) {
        // var dice = message.content.substr("!dice ".length);
        // var darray = dice.split(" ");
        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Dice - HELP');
            st.addText('returns the sum of rolling a specific number of dice\n'
            +'this command will also declare how many of those dice rolled critical failures or successes\n'
            +'usage: <number of dice> <type of die>\n'
            +'supported die types are: d2, d4, d6, d8, d10, d12, d20, and d100');
            st.sendMessage(message.channel);
            return;
        }
        amount = args[0];
        if(amount > 100) {
            st.clearMessage();
            st.setTitle('Dice - ERROR');
            st.addText('The maximum number of dice you can roll at once is 100.');
            st.sendMessage(message.channel);
            return;
        }
        size = args[1].toLowerCase();
        validDice = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
        if(!validDice.includes(size)) {
            st.clearMessage();
            st.setTitle('Dice - ERROR');
            st.addText(`'${size}' is not a valid type of die.\nSupported die types are: d2, d4, d6, d8, d10, d12, d20, and d100`);
            st.sendMessage(message.channel);
            return;
        }
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
            if(size == "d6"){
                rolledamount = ((Math.floor(Math.random() * 6) + 1));
                if(rolledamount == 6){
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


        st.clearMessage();
        st.setTitle('Dice - Result');
        if(amount == 1 && critsuccess > 0){
            st.addText(`You have rolled a ${size} and got a Critical Success with a roll of ${roll}`);
            // message.channel.send(`You have rolled a ${size} and got a Critical Success with a roll of ${roll}`);
        }
        else
         if(amount == 1 && critfail > 0){
            st.addText(`You have rolled a ${size} and got a Critical Failure with a roll of ${roll}`);
            // message.channel.send(`You have rolled a ${size} and got a Critical Failure with a roll of ${roll}`);
        }
        else if(amount == 1){
            st.addText(`You have rolled a ${size} and got a ${roll}`);
            // message.channel.send(`You have rolled a ${size} and got a ${roll}`);
        }
        else if(amount > 1){
            st.addText(`You have rolled ${amount} ${size} and got a total of ${roll}\n
            there was ${critsuccess} crits and ${critfail} critical failures.`);
            // message.channel.send(`You have rolled ${amount} ${size} and got a total of ${roll}\n
            // there was ${critsuccess} crits and ${critfail} critical failures.`);
        }
        else{
            st.setTitle('Dice - ERROR');
            st.addText(`Make sure that your command follows the rules (!dice "amount" d"size")`);
            // message.channel.send(`Make sure that your command follows the rules (!dice "amount" d"size")`);
        }
        st.sendMessage(message.channel);
    },
};
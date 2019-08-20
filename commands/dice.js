module.exports = {
    name: 'dice',
    description: 'Allows the user to roll dice. syntax: dice <ammount> d<type>',
    aliases: ['roll'],
    guildOnly: true,
    args: true,
    cooldown: false,
    execute(message, args) {
    const Discord = require('discord.js');
    // if (message.content.startsWith("!dice ")) {
        // var dice = message.content.substr("!dice ".length);
        // var darray = dice.split(" ");
        if (args[0] == '?') {
            message.channel.send('returns the sum of rolling a specific number of dice\n'
            +'this command will also declare how many of those dice rolled critical failures or successes\n'
            +'usage: <number of dice> <type of die>\n'
            +'supported die types are: d2, d4, d6, d8, d10, d12, d20, and d100');
            return;
        }
        amount = args[0];
        size = args[1];
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


        
        let embed = new Discord.RichEmbed;
        embed.setColor(0x0099ff);
        embed.setThumbnail('https://i.imgur.com/sRNA93B.png');
        if(amount == 1 && critsuccess > 0){
            embed.addField('Dice', `You have rolled a ${size} and got a Critical Success with a roll of ${roll}`, true);
            // message.channel.send(`You have rolled a ${size} and got a Critical Success with a roll of ${roll}`);
        }
        else
         if(amount == 1 && critfail > 0){
            embed.addField('Dice', `You have rolled a ${size} and got a Critical Failure with a roll of ${roll}`, true);
            // message.channel.send(`You have rolled a ${size} and got a Critical Failure with a roll of ${roll}`);
        }
        else if(amount == 1){
            embed.addField('Dice',`You have rolled a ${size} and got a ${roll}`, true);
            // message.channel.send(`You have rolled a ${size} and got a ${roll}`);
        }
        else if(amount > 1){
            embed.addField('Dice',`You have rolled ${amount} ${size} and got a total of ${roll}\n
            there was ${critsuccess} crits and ${critfail} critical failures.`, false);
            // message.channel.send(`You have rolled ${amount} ${size} and got a total of ${roll}\n
            // there was ${critsuccess} crits and ${critfail} critical failures.`);
        }
        else{
            embed.addField('Error',`Make sure that your command follows the rules (!dice "amount" d"size")`, true);
            // message.channel.send(`Make sure that your command follows the rules (!dice "amount" d"size")`);
        }
        message.channel.send(embed);
    },
};
module.exports = {
    name: 'rule-help',
    description: 'Returns the Offical D&D 5E ruling on commonly missed rules',
    aliases: ['rulehelp', 'rh'],
    guildOnly: true,
    args: true,
    usage: '<rule name>',
    cooldown: false,
    execute(message, args) {

        if (args[0] == '?') {
            message.channel.send('This command returns the official d&d ruling on a specified topic\n'
            +'If I cannot find the topic you entered, I will return topics with similar names, if any exist\n'
            +'usage: !rule-help <name of rule/topic>');
            return;
        }

        const Discord = require('discord.js');
        const rp = require('..\\helperMethods\\fileParser.js');
        var ruleData = rp.execute('rule_list.txt', 4);
        var ruleName = args.join(' ').trim().toUpperCase();
        var found = false;

        let embed = new Discord.RichEmbed;
        embed.setColor(0x0099ff);
        embed.setThumbnail('https://i.imgur.com/sRNA93B.png');
        for (i = 0; i < ruleData.length && !found; i++) {
            if (ruleData[i][0].toUpperCase() == ruleName) {
                embed.setTitle(`${ruleData[i][0]}`);
                embed.setDescription(`${ruleData[i][1]}\n\n${ruleData[i][2]!=""?ruleData[i][2]+'\n\n':""}Source: ${ruleData[i][3]}`);
                found = true;
            }
        }
        if (!found) {

            var matches = [0, -1];
            for (i = 0; i < ruleData.length; i++) {
                if (ruleData[i][0].toUpperCase().includes(ruleName)) {
                    matches[0]++;
                    matches[1] = i;
                }
            }
            if (matches[0] == 1) {
                this.execute(message, ruleData[matches[1]][0].split(' '));
            }
            else {
                embed.addField('I couldn\'t find a rule with that name.','\u200B', true);
                for (i = 0; i < ruleData.length; i++) {
                    if (ruleData[i][0].toUpperCase().includes(ruleName.substring(0, 3))) {
                        if (!found) {
                            embed.addField('\u200B','_Were you looking for one of these?_', false);
                            found = true;
                        }
                        embed.addField('\u200B',`**${ruleData[i][0]}**`);
                    }
                }
            }
        }
        if (embed.fields != undefined && embed.fields.length > 0 || embed.title != undefined) {
            message.channel.send(embed);
        }
    },
};
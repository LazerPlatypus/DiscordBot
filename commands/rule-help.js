module.exports = {
    name: 'rule-help',
    description: 'Returns the Offical D&D 5E ruling on commonly missed rules',
    aliases: ['rulehelp', 'rh'],
    guildOnly: true,
    args: true,
    usage: '<rule name>',
    cooldown: false,
    execute(message, args) {
        const rp = require('..\\helperMethods\\fileParser.js');
        var ruleData = rp.execute('rule_list.txt', 4);
        var ruleName = args.join(' ').trim().toUpperCase();
        var found = false;
        for (i = 0; i < ruleData.length && !found; i++) {
            if (ruleData[i][0].toUpperCase() == ruleName) {
                message.channel.send(`__**${ruleData[i][0]}**__\n\n${ruleData[i][1]}\n${ruleData[i][2]}\n\nSource: ${ruleData[i][3]}`);
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
                message.channel.send('I couldn\'t find a rule with that name.')
                for (i = 0; i < ruleData.length; i++) {
                    if (ruleData[i][0].toUpperCase().includes(ruleName.substring(0, 3))) {
                        if (!found) {
                            message.channel.send('Were you looking for one of these?');
                            found = true;
                        }
                        message.channel.send(`**${ruleData[i][0]}**`);
                    }
                }
            }
        }
    },
};
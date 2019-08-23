module.exports = {
    name: 'rule-help',
    description: 'Returns the Offical D&D 5E ruling on commonly missed rules',
    aliases: ['rulehelp', 'rh'],
    guildOnly: false,
    args: true,
    usage: '<rule name>',
    cooldown: false,
    execute(message, args) {

        const st = require('..\\helperMethods\\send-text.js');

        if (args[0] == '?') {
            st.clearMessage();
            st.setTitle('Rule-Help HELP');
            st.addText('This command returns the official d&d ruling on a specified topic\n'
            +'If I cannot find the topic you entered, I will return topics with similar names, if any exist\n'
            +'usage: !rule-help <name of rule/topic>');
            st.sendMessage(message.channel);
            return;
        }

        const Discord = require('discord.js');
        const rp = require('..\\helperMethods\\fileParser.js');
        var ruleData = rp.execute('rule_list.txt', 4);
        var ruleName = args.join(' ').trim().toUpperCase();
        var found = false;

        for (i = 0; i < ruleData.length && !found; i++) {
            if (ruleData[i][0].toUpperCase() == ruleName) {
                st.clearMessage();
                st.setTitle(`${ruleData[i][0]}`);
                st.addText(`${ruleData[i][1]}\n\n${ruleData[i][2]!=""?ruleData[i][2]+'\n\n':""}Source: ${ruleData[i][3]}`);
                st.sendMessage(message.channel);
                st.clearMessage();
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
                return;
            }
            else {
                st.clearMessage();
                st.setTitle('I couldn\'t find a rule with that name.');
                for (i = 0; i < ruleData.length; i++) {
                    if (ruleData[i][0].toUpperCase().includes(ruleName.substring(0, 3))) {
                        if (!found) {
                            st.addText('_Were you looking for one of these?_\n');
                            found = true;
                        }
                        st.addText(`**${ruleData[i][0]}**\n`);
                    }
                }
            }
        }
        if (st.text != '') {
            st.sendMessage(message.channel);
        }
    },
};
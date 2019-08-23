module.exports = {
    name: 'send-text',
    description: 'use this method to send text to the user.' + 
    'put text in the file with .add(<text to send>), and send it .send(<target>)' +
    'targets can be message.channel or message.author' +
    'NOTICE: use clearMessage() before adding anything to be sent.',
    color: [0, 153, 255],
    author: '',
    thumbnail: 'https://i.imgur.com/sRNA93B.png',
    title: '',
    text: '',
    clearMessage() {
        this.color = [0, 153, 255];
        this.author = '';
        this.thumbnail = 'https://i.imgur.com/sRNA93B.png';
        this.title = '';
        this.text = '';
    },
    setColor(color) {
        this.color = color;
    },
    setAuthor(authorText) {
        this.author = authorText;
    },
    setThumbnail(thumbnailURL) {
        this.thumbnail = thumbnailURL
    },
    setTitle(title) {
        this.title = title;
    },
    addText(text) {
        this.text += text;
    },
    sendMessage(target) {
        //load dependencies
        const Discord = require('discord.js');
        
        let embeds = new Array(0);
        let textArr = this.text.split('\n');

        //loop through all the text
        for (i = 0, t = 0, j = -1; t < textArr.length; i++) {
            // we can fit ~5 fields per embed :(
            if (i % 5 == 0)  {
                // so when we hit 5, push a new embed and increment the counter
                embeds.push(new Discord.RichEmbed);
                j++

                // the first embed should have the title and author (if present)
                if (j == 0) {
                    if (this.author != '') embeds[j].setAuthor(this.author);
                    if (this.title != '') embeds[j].setAuthor(this.title);
                }
                
                // all embeds should be blue, with the thumbnail
                embeds[j].setColor(0x0099ff);
                embeds[j].setThumbnail('https://i.imgur.com/sRNA93B.png');
            }

            // this is what we'll use to populate the embed field
            let embedText = '';
            // if we have really big paragraphs, we have to widow them...
            if (textArr[t].length > 1000) {
                embedText = textArr[t].substr(0, 1001);
                textArr[t] = textArr[t].substring(1000);
            // otherwise, we'll populate embed by every newline.
            } else {
                while (textArr[t] != undefined && (embedText.length+textArr[t].length) < 1000) {
                    embedText += textArr[t];
                    embedText += '\n';
                    // console.log(embedTextLen);
                    t += 1;
                }
            }
            // populate that embed with the text
            embeds[j].addField('\u200B', embedText)
        }
        
        // send all of our embeds.
        embeds.forEach(embed => {
            target.send(embed);
        })
    }
}
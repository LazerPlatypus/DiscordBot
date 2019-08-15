module.exports = {
    name: 'download',
    description: 'downloads the file from a url, calls the callback with the file.'+
    'also saves the file in the dest',
    execute(url, location, fileName, fileExtension, cb) {
        const fs = require('fs'); //loads the filesystem
        const https = require('https'); // loads a https handler (discord used https *exclusivly*)
        const ffmpeg = require('fluent-ffmpeg'); // gets the module to append silence to the end of the audio file
        var file; 
        // list of the accepted sound extensions
        const soundExtensions = ['mp3', 'ogg', 'aac'];
        
        if (soundExtensions.includes(fileExtension)) {
          file = fs.createWriteStream(location + fileName + '1.' + fileExtension); // makes a file at the dest
        } else {
          file = fs.createWriteStream(location + fileName + '.' + fileExtension); // makes a file at the dest
        }

        // grabs the file form the url, saves it at the dest, and calls the callback when it's finished
        var request = https.get(url, function(response) {
            response.pipe(file)
            file.on('finish', function() {
                file.close(cb);
            });
        }).on('error', function(err) {
            fs.unlink(location + fileName + "." + fileExtension);
            if (cb) cb(err.message);
        });

        if (soundExtensions.includes(fileExtension)) {
          function appendSilence() {
          ffmpeg(location + fileName + "1." + fileExtension).input('uploads\\silence.mp3').mergeToFile(location + fileName + "." + fileExtension)
          .on('end', function () {
            try {
              setTimeout(fs.unlinkSync(location + fileName + "1." + fileExtension), 5000);
            } catch(err) {
            }
          });
        }
        
        setTimeout(appendSilence, 1000);
      }
        
      },
    }
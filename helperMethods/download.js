module.exports = {
    name: 'download',
    description: 'downloads the file from a url, calls the callback with the file.'+
    'also saves the file in the dest',
    execute(url, dest, cb) {
        const fs = require('fs'); //loads the filesystem
        const https = require('https'); // loads a https handler (discord used https *exclusivly*)
        var file = fs.createWriteStream(dest); // makes a file at the dest
        // grabs the file form the url, saves it at the dest, and calls the callback when it's finished
        var request = https.get(url, function(response) {
            response.pipe(file)
            file.on('finish', function() {
                file.close(cb);
            });
        }).on('error', function(err) {
            fs.unlink(dest);
            if (cb) cb(err.message);
        });
    },
}
const lineByLine = require('n-readlines');
const fs = require('fs');


module.exports = {
    lastLineOfFileSync: function (filename) {
        const liner = new lineByLine(filename);
        var lastLine;
        var line;
        while (line = liner.next()) {
            if (line) {
                lastLine = line.toString("UTF-8");
            }
        }
        return lastLine;
    },
    handleResponseToFile: function (filename) {
        return function (error, response, body) {
            if (response && response.statusCode === 200) {
                var lastModified = response.headers['last-modified'];
                if (lastModified) {
                    lastModified = new Date(lastModified);
                    var appendLine = lastModified.toISOString() + "\t" + JSON.stringify(JSON.parse(body));
                    fs.appendFileSync(filename, appendLine + "\n");
                    console.info("New last modified date: " + lastModified);
                }
            } else if (response && response.statusCode === 304) {
                console.info("Not modified");
            } else if (response) {
                console.error("Unexpected response received. Status code", response && response.statusCode);
            } else {
                console.error("Unexpected result", error);
            }
        }
    },
    requestOptionsFor: function (token, lastModified) {
        const authorizationHeader = 'token ' + token;
        const options = {
            url: 'https://api.github.com/notifications',
            headers: {
                'Authorization': authorizationHeader,
                'User-Agent': "CaptureNotifications"
            }
        };
        if (lastModified) {
            options.headers["If-Modified-Since"] = lastModified.toUTCString();
        }
        return options;
    },

};
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
    notificationToLine: function (notification) {
        return notification.lastModified.toISOString() + "\t" + JSON.stringify(JSON.parse(notification.body));
    },
    extractNotification: function (response, body) {
        if (response.statusCode === 200) {
            const lastModified = response.headers['last-modified'];
            if (lastModified) {
                return {
                    lastModified: new Date(lastModified),
                    body: body
                };
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
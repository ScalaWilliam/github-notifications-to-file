#!/usr/bin/env node
"use strict";

const request = require('request');

const argv = require('yargs')
    .alias('f', 'file')
    .demandOption('f')
    .describe('f', 'target file')
    .string('f')
    .argv;

var filename = argv.file;
if ( filename === "-" ) {
    filename = "/dev/stdout";
}
const gnf = require('./lib/gnf.js');
const fs = require('fs');
fs.appendFileSync(filename, '');
const lastLine = filename !== "/dev/stdout" && gnf.lastLineOfFileSync(filename);
const lastDate = lastLine && new Date(lastLine.split("\t")[0]);

request(
    gnf.requestOptionsFor(process.env.GITHUB_TOKEN, lastDate),
    function (error, response, body) {
        const notification = gnf.extractNotification(response, body);
        if (notification) {
            const line = gnf.notificationToLine(notification);
            fs.appendFileSync(filename, `${line}\n`);
        } else if (error) {
            console.error("Failed to process due to error", error);
        } else {
            console.info("Did not get new messages, status code", response.statusCode);
        }
    }
);

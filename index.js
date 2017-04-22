"use strict";

const request = require('request');

const argv = require('yargs')
    .alias('f', 'file')
    .demandOption('f')
    .describe('f', 'target file')
    .string('f')
    .argv;

const filename = argv.file;
const gnf = require('./lib/gnf.js');
const fs = require('fs');
fs.appendFileSync(filename, '');
const lastLine = gnf.lastLineOfFileSync(filename);
const lastDate = lastLine && new Date(lastLine.split("\t")[0]);

request(
    gnf.requestOptionsFor(process.env.GITHUB_TOKEN, lastDate),
    gnf.handleResponseToFile(filename)
);

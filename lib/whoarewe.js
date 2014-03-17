#!/usr/bin/env node
/*
 * whoarewe
 * https://github.com/mustafar/whoarewe
 *
 * Copyright (c) 2014 Mustafa Rizvi
 * Licensed under the MIT license.
 */

'use strict';

var words = require('./words.js');
var fonts = require('./fonts.js');
var figlet = require('figlet');
var windowSize = require('window-size');

if (process.argv[process.argv.length - 1] === "--version") {
  var packageJson = require('../package.json');
  console.log('v' + packageJson.version + ", Your Grace.");
  return;
}

var you = function() {
  return process.env[(process.platform === 'win32') ? 'USERNAME' : 'USER'];
},
randomPick = function(arr) {
  var index = Math.floor(Math.random() * arr.length) + 1;
  return arr[index - 1];
},
randomBool = function() {
  return Math.random() < 0.5;
};

var textFull = "You are " + you() + ", " +
  randomPick(words.superlatives) + " of "  + randomPick(words.subjects) + ".";
var textAscii = you();

// try figlet
if (randomBool()) {
  figlet(textAscii, {
      font: randomPick(fonts.list),
      horizontalLayout: 'default',
      verticalLayout: 'default'
    }, function(err, data) {
    if (err) {
      console.log(textFull);
      return;
    }
    
    // print ASCII if it is < 90% of the last line of ASCII text
    if ((data.length - data.lastIndexOf("\n")) < (0.9 * windowSize.width)) {
      var firstLine = data.substring(0, data.indexOf("\n"));
      if (firstLine.length > 0 && firstLine.trim().length > 0) {
        console.log();
      }
      console.log(data);
      var lastLine = data.substring(data.lastIndexOf("\n"));
      if (lastLine.length > 0 && lastLine.trim().length > 0) {
        console.log();
      }
    } else {
      console.log(textFull);
    }
  });

// or regular text
} else {
  console.log(textFull);
}
  

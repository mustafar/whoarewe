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
    console.log(data);
  });

// or regular text
} else {
  console.log(textFull);
}
  

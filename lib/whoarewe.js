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

var you = function() {
  return process.env[(process.platform === 'win32') ? 'USERNAME' : 'USER'];
};
var randomPick = function(arr) {
  var index = Math.floor(Math.random() * arr.length) + 1;
  return arr[index - 1];
};

console.log("You are " + you() + ", " +
  randomPick(words.superlatives) + " of " + randomPick(words.subjects) + ".");

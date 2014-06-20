#!/usr/bin/env node

/*
 * localize-brick
 * https://github.com/alicoding/grunt-localize-brick
 *
 * Copyright (c) 2014 Ali Al Dallal
 * Licensed under the MIT license.
 */
'use strict';
var path = require('path');
var inquirer = require('inquirer');
var _ = require('lodash');
var fs = require('fs');
var htmlparser = require("htmlparser");
var content;

function myReduce(n, o, fields, p, c) {
  if (p === undefined) p = '', c = {};
  for (var prop in o) {
    if (!o.hasOwnProperty(prop)) continue;
    if (fields.indexOf(prop) != -1) c[n + '/' + p + prop] = o[prop];
    else if (typeof o[prop] === 'object') myReduce(n, o[prop], fields, prop + '/', c);
  }
  return c;
}

module.exports = function () {
  fs.readFile(path.join(process.cwd(), "component.html"), function(err, rawHtml) {
    if(err && err.code === 'ENOENT') {
      throw new Error('component.html Not found in ' + process.cwd());
    }
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error) {
        console.error(error);
      } else {
        for (var m = 0; m < dom.length - 1; m ++) {
          if (dom[m].name === 'polymer-element') {
            for (var i = 0; i < dom[m].children.length - 1; i++) {
              if (dom[m].children[i].name && dom[m].children[i].name === 'ceci-definition') {
                var x = JSON.parse(dom[m].children[i].children[0].raw);
                content = myReduce(dom[m].attribs.name, x, ['name', 'label', 'description']);
                console.log(content);
              }
            }
          }
        }
      }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);
    inquirer.prompt(
      [{
        name: "Continue",
        type: 'confirm',
        message: 'Do you want to write this content to "locale/en-US.json" :',
        validate: function (value) {
          if (value === '') {
            return 'A value is required.';
          }
          return true;
        }
      }, {
        name: "path",
        type: 'input',
        message: 'What is the path then? (Relative to ' + process.cwd() + '):',
        validate: function (value) {
          if (value === '') {
            return 'A value is required.';
          }
          return true;
        },
        when: function (value) {
          return !value.Continue;
        }
      }, {
        name: "Confirming",
        type: 'confirm',
        message: 'Are you sure you want to continue? (This will overwrite the existing content in the given path',
        validate: function (value) {
          if (value === '') {
            return 'A value is required.';
          }
          return true;
        }
      }], function (answer) {
        if (!answer.Continue) {
          if (answer.Confirming) {
            fs.writeFile(path.join(process.cwd(), answer.path), JSON.stringify(content, null, 2), function(err) {
              if(err) {
                throw err;
              }
            });
          }
        } else {
          if(answer.Confirming) {
            fs.mkdir(path.join(process.cwd(), 'locale'), function(err) {
              if(err && !err.code == 'EEXIST') {
                console.error(err)
              }
              fs.writeFile(path.join(process.cwd(), 'locale/en-US.json'), JSON.stringify(content, null, 2), function(err) {
                if(err) {
                  console.error(err)
                }
              });
            });
          }
        }
      });
  });
}();

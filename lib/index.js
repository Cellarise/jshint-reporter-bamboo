/* jslint node: true */
"use strict";
var map = require('map-stream');


/**
 * {description}
 * @module {name}
 * @param reportJSON {Object} - Atlassian Bamboo Mocha Test Parser JSON object to be updated with the results of the test
 * @param opts {Object} - Task configuration options
 * @param [opts.opts.suiteName='JSHint'] {string} - The test suite name
 * @param [opts.opts.suiteDesc='JSHint'] {string} - The test suite description
 * @returns {readable-stream/transform}
 * @example
 {>example-index/}
 */
module.exports = function (reportJSON, opts) {
    opts = opts || {
        suiteName: 'JSHint',
        suiteDesc: 'JSHint'
    };
    //setup reportJSON - do not overwrite reportJSON so add properties
    reportJSON = reportJSON || {};
    reportJSON.stats = reportJSON.stats || {
        "suites": 0,
        "tests": 0,
        "passes": 0,
        "pending": 0,
        "failures": 0,
        "duration": 0
    };
    /**
    reportJSON.stats.suites = reportJSON.stats.suites || 0;
    reportJSON.stats.tests = reportJSON.stats.tests || 0;
    reportJSON.stats.passes = reportJSON.stats.passes || 0;
    reportJSON.stats.pending = reportJSON.stats.pending || 0;
    reportJSON.stats.failures = reportJSON.stats.failures || 0;
    reportJSON.stats.start = reportJSON.stats.start || new global.Date();
    reportJSON.stats.end = reportJSON.stats.end || new global.Date();
    reportJSON.stats.duration = reportJSON.stats.duration || 0;
    reportJSON.failures = [];
    reportJSON.passes = [];
    reportJSON.skipped = [];
     **/
    reportJSON.stats.start = reportJSON.stats.start || new global.Date();
    reportJSON.stats.end = reportJSON.stats.end || new global.Date();
    reportJSON.failures = [];
    reportJSON.passes = [];
    reportJSON.skipped = [];

    function encode(s) {
        var pairs = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&apos;",
            "<": "&lt;",
            ">": "&gt;"
        };
        for (var r in pairs) {
            if (typeof (s) !== "undefined") {
                s = s.replace(new RegExp(r, "g"), pairs[r]);
            }
        }
        return s || "";
    }

    function failure_message(failures) {
        var count = failures.length;
        if (count === 1) {
            return "1 " + opts.suiteName + " Failure";
        } else {
            return count + " " + opts.suiteName + " Failures";
        }
    }

    function failure_details(failures) {
        var msg = [];
        var item;
        for (var i = 0; i < failures.length; i = i + 1) {
            item = failures[i];
            msg.push(i + 1 + ". line " + item.line + ", char " + item.character + ": " + encode(item.reason));
        }
        return msg.join("\n");
    }

    return map(function (file, cb) {
        var result, now = new global.Date();

        result = {
            "title": " " + file.path.replace(/.*[\\\/]/, ''),
            "fullTitle": " " + file.path,
            "duration": now - reportJSON.stats.end
        };
        reportJSON.stats.suites = reportJSON.stats.suites + 1;
        reportJSON.stats.tests = reportJSON.stats.tests + 1;
        reportJSON.stats.end = now;
        reportJSON.stats.duration = reportJSON.stats.end - reportJSON.stats.start;

        if (file.hasOwnProperty('jshint')){
            if (!file.jshint.success) {
                reportJSON.stats.failures = reportJSON.stats.failures + 1;
                result.error = failure_message(file.jshint.results) + " " + opts.suiteName + ": " + failure_details(file.jshint.results);
                reportJSON.failures.push(result);
            } else {
                reportJSON.stats.passes = reportJSON.stats.passes + 1;
                reportJSON.passes.push(result);
            }
        }

        cb(null, file);
    });
};
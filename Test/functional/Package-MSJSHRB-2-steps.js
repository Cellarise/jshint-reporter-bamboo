/* jslint node: true */
"use strict";
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var jshint = require('gulp-jshint');
var English = require('yadda').localisation.English;
var assert = require('assert');

/* Feature: Create bamboo reporter for JSHint */
module.exports = (function() {
    return English.library()
    /*Scenario: Lint code with no errors */
        .define("Given I have a $name Javascript file", function(filename, done) {
            this.world.template = path.join(__dirname, '../resources/' + filename);
            assert(fs.existsSync(this.world.template + '.js'));
            done();
        })
        .define("When I lint the file", function(done) {
            var JshintReporterBamboo = require('../../lib/index');
            var report = {};
            var self = this;
            this.world.report = {};

            gulp.src(this.world.template + '.js')
                .pipe(jshint())
                .pipe(new JshintReporterBamboo(report))
                .on('end', function() {
                    self.world.report = report.results;
                    done();
                });
        })
        .define("Then a report is produced with $result", function(result, done) {
            var expected = JSON.parse(fs.readFileSync(this.world.template + "_mocha.json"));
            var actual = this.world.report;
            //remove timestamps
            delete expected.stats.start;
            delete expected.stats.end;
            delete expected.stats.duration;
            delete actual.stats.start;
            delete actual.stats.end;
            delete actual.stats.duration;

            if(actual.failures.length > 0){
                delete actual.failures[0].duration;
                delete actual.failures[0].fullTitle;
            }
            if(expected.failures.length > 0){
                delete expected.failures[0].duration;
                delete expected.failures[0].fullTitle;
            }
            if(actual.passes.length > 0){
                delete actual.passes[0].duration;
                delete actual.passes[0].fullTitle;
            }
            if(expected.passes.length > 0){
                delete expected.passes[0].duration;
                delete expected.passes[0].fullTitle;
            }

            actual = JSON.stringify(actual);
            expected = JSON.stringify(expected);
            assert.equal(actual, expected);
            done();
        });
})();
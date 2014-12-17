/*
 * grunt-task-looper
 * https://github.com/mlenkeit/grunt-task-looper
 *
 * Copyright (c) 2014 Maximilian Lenkeit
 * Licensed under the MIT license.
 */


'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('task-looper', 'Executes a list of tasks for each array element.', function () {
		var exec = require('child_process').exec,
			done = this.async();

		// Options
		var options = this.options({
				verbose : false
			}),
			list = this.data.list || [],
			templateTasks = this.data.tasks || [];

		// Replace placeholders
		var taskLists = list.map(function(data) {
			return templateTasks.map(function(templateTask) {
				if (grunt.util.kindOf(templateTask) === 'function') {
					return templateTask(data);
				} else {
					return templateTask;
				}
			});
		});

		function processNextTaskList() {
			var taskList = taskLists.shift(),
				data = list.shift();
			if (taskList) {
				if (grunt.util.kindOf(options.onBeforeProcessingTasks) === 'function') {
					options.onBeforeProcessingTasks(data);
				}
				var cp = exec('grunt ' + taskList.join(' '), function (error, stdout, stderr) {
					if (error) {
						grunt.log.error(error);
						done(false);
						return;
					}
					if (grunt.util.kindOf(options.onTasksProcessedSuccessfully) === 'function') {
						options.onTasksProcessedSuccessfully(data);
					}
					processNextTaskList();
				});
				if (options.verbose) {
					// pipe outputs from child process to current process
					cp.stdout.on('data', function(data) {
						process.stdout.write(data);
					});
					cp.stderr.on('data', function(data) {
						process.stderr.write(data);
					});
				}
			} else {
				done();
			}
		};
		processNextTaskList();
	});
};
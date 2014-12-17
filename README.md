# grunt-task-looper

> Executes a list of tasks for each array element.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-task-looper --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-task-looper');
```

## Task "task-looper"
_Run this task with the `grunt task-looper` command._

### Options

#### onBeforeProcessingTasks
Type: `Function`

Callback function that is invoked before the tasks for an array element are processed (i.e. the corresponding tasks are executed). Receives the array element as first parameter.

#### onTasksProcessedSuccessfully
Type: `Function`

Callback function that is invoked when the tasks for an array element are processed successfully (i.e. the corresponding tasks completed without errors). Receives the array element as first parameter.

#### verbose
Type: `Boolean`
Default: `false`

True to log the standard output of the tasks, false otherwise.

### Parameters

#### list
Type: `Array`

The array that should be looped.

#### tasks
Type: `Array`

An array of executable tasks. If an array element is a function, it receives the current element from the `list` parameter as parameter and has to return a valid task name or empty string.

### Usage examples

In the following example, the running `task-looper:tests` would first run `grunt serve testrunner:a` followed by `grunt testrunner:b`. Note that these two are run in individual sub-processes.

Gruntfile.js:
```js
'task-looper' : {
  options : {
    onBeforeProcessingItem : function(data) {
      grunt.log.write('Running tests with ' + data);
    },
    onItemProcessedSuccessfully : function(data) {
      grunt.log.ok();
    },
    verbose : false
  },
  tests : {
    list : ['Option 1', 'Option 2'],
    tasks : [
      'serve',
      function(data) {
        return 'testrunner:' + (data === 'Option 1' ? 'a' : 'b');
      }
    ]
  }
}
```
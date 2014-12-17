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

## Task "loop-task"
_Run this task with the `grunt loop-task` command._

### Options

#### onBeforeProcessingItem
Type: `Function`

Callback function that is invoked before an item is processed (i.e. the corresponding tasks are executed). Receives the item as first parameter.

#### onItemProcessedSuccessfully
Type: `Function`

Callback function that is invoked when an item is processed successfully (i.e. the corresponding tasks completed without errors). Receives the item as first parameter.

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

In the following example, the running `loop-task:tests` would first run `grunt serve testrunner:a` followed by `grunt testrunner:b`. Note that these two are run in individual sub-processes.

Gruntfile.js:
```js
'loop-task' : {
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
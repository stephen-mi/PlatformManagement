var inquirer = require('inquirer')
var jetpack = require('fs-jetpack')
var yargs = require('yargs')
var _ = require('lodash')
var moment = require('moment')
var spawn = require('child_process').spawn

var historyPath = './build/ask.json'

if (!jetpack.exists(historyPath)) {
  jetpack.file(historyPath, {
    content: {
      mode: ['mock'],
      compress: true,
      buildSourceMap: false,
      cdn: false
    }
  })
}

var history = jetpack.read(historyPath, 'json')

argv = yargs.usage('Usage: $0 <command> [options]')
.boolean('dev')
.boolean('build')
  .argv

var questions = []
if (argv.dev) {
  questions.push({
    type: 'checkbox',
    name: 'mode',
    message: 'Please choose mode',
    choices: [{
      name: 'mock',
      checked: history.mode.indexOf('mock') !== -1,
    }, {
      name: 'alignment',
      checked: history.mode.indexOf('alignment') !== -1
    }]
  })
} else if (argv.build) {}

inquirer.prompt(questions).then(function (answers) {
  var command
  if (argv.dev) {
    command = 'npm run _dev'
  } else if (argv.build) {
  }
  command += ' -- '
  if (argv.dev) {
    if (answers.mode.indexOf('mock') !== -1) {
      command += ' --mock'
    }
    if (answers.mode.indexOf('alignment') !== -1) {
      command += ' --alignment'
    }
  } else {
  }
  // write back answers to history
  history = _.assign(history, answers)
  jetpack.writeAsync(historyPath, history).then(() => {}, (err) => {console.log(err)})

  // preserve color when executing child_process.spawn
  // reference to http://stackoverflow.com/questions/7725809/preserve-color-when-executing-child-process-spawn
  var cmd = ''

  if (/^win/.test(process.platform)) {
    cmd = spawn('cmd', ['/s', '/c', command], { stdio: 'inherit' });
  } else {
    cmd = spawn('/bin/sh', ['-c', command], { stdio: 'inherit' })
  }
  cmd.stdout.on('data', function (data) {
    console.log(data)
    process.stdout.write(data)
  })

  cmd.stderr.on('data', function (data) {
    process.stderr.write(data)
  })

  cmd.on('exit', function (code) {
    console.log(code)
  })
}, function (err) {
  console.log(err)
}).catch(() => {})

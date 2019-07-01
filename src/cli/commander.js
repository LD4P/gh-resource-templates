const commander = require('commander')
const CLI = require('./index')
const githubResourceTemplate = require('../../package')

const cli = new CLI()

commander
  .name('ghrt')
  .version(githubResourceTemplate.version, '-v, --version')

// Parse command-line args and invoke specified command
commander.parse(process.argv)

// Print help because no command above was invoked
commander.help()

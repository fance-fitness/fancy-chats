exports.config = {
  tests: './acceptance-tests/*_test.js',
  output: './acceptance-tests/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:4200',
      show: false
    }
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'dance-planner'
}

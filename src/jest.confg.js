/** @type {import('jest').Config} */
require.resolve('./FixJSDOMEnvironment.ts')

const config = {
    testEnvironment: './FixJSDOMEnvironment.ts',
  }
  
  module.exports = config;
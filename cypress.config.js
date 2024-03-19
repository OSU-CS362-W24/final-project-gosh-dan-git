const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Specify the baseUrl of your application
  baseUrl: 'http://localhost:8080', // or your staging/production URL

  // Specify the test files to run
  // You can adjust the glob patterns to match your test file naming convention
  // For example, if your test files are located in the cypress/integration folder and have a .spec.js extension:
  // integrationFolder: 'cypress/integration',
  // testFiles: '**/*.spec.js',

  // Define additional configurations
  // This is where you can configure plugins, environment variables, etc.
  // For example:
  // pluginsFile: 'path/to/plugins/index.js',
  // supportFile: 'path/to/support/index.js',

  // Specify any Cypress-specific configurations
  // For example, if you want to disable video recording during test runs:
  // video: false,
  
  // You can also add custom configurations specific to your project
  // For example, if you have custom commands or tasks:
  // customCommandsPath: 'path/to/custom/commands',
  // taskTimeout: 60000,

  // Define environment-specific configurations using environment variables
  // For example, to configure different base URLs for different environments:
  // development: {
  //   baseUrl: 'http://localhost:3000'
  // },
  // staging: {
  //   baseUrl: 'https://staging.example.com'
  // },
  // production: {
  //   baseUrl: 'https://example.com'
  // },

  // Optionally, you can define additional Cypress settings for specific test types
  // For example, to configure settings for end-to-end tests:
  // e2e: {
  //   browser: 'chrome',
  //   viewportWidth: 1200,
  //   viewportHeight: 800
  // }
});

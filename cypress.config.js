const { defineConfig } = require('cypress');
 
module.exports = defineConfig({
 reporter: 'cypress-mochawesome-reporter',
 reporterOptions: {
   reportDir: 'cypress/reports',
   charts: true,
   reportPageTitle: 'Test Report',
   embeddedScreenshots: true,
   inlineAssets: true
 },
 video: true, // Enables video recording
 e2e: {
   setupNodeEvents(on, config) {
     require('cypress-mochawesome-reporter/plugin')(on);
   }
 }
});

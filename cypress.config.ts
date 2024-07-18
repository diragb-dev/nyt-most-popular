import { defineConfig } from "cypress";
const webpackConfig = require('./cypress/webpack.config.js');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('file:preprocessor', require('@cypress/webpack-preprocessor')({
        webpackOptions: webpackConfig,
      }))
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});

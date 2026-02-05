/*const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      config.env = config.env || {};
      config.env.frontendUrl = "http://localhost:3000";
      config.env.backendUrl = "http://localhost:5000";

      return config;
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
  },
});
*/

const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    /*baseUrl: "http://localhost:5000",*/

    setupNodeEvents(on, config) {
      config.env = config.env || {};
      config.env.frontendUrl =
        port === "3000" || port === "5173"
          ? `http://localhost:${port}`
          : "http://localhost:3000";
      const isLocal = window.location.hostname === "localhost";
      config.env.backendUrl = isLocal
        ? "http://localhost:5000"
        : "https://newevents-app.onrender.com";
      return config;
    },

    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
  },
});

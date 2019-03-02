module.exports = function strykerSetup(config) {
  config.set({
    mutator: "javascript",
    mutate: ["src/**/*.js", "!src/**/*.test.js"],
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    transpilers: [],
    coverageAnalysis: "off"
  });
};

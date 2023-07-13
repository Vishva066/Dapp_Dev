
const certi = artifacts.require("certi");

module.exports = function(_deployer) {
  // Use deployer to state migration tasks.
  _deployer.deploy(certi);
};

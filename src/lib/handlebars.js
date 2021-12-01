const helpers = {};

helpers.selected = (valueUser, valueDistrict) => {
  return valueUser === valueDistrict ? (selected = "selected") : "";
};

module.exports = helpers;

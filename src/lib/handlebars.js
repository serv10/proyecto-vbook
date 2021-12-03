const helpers = {};

helpers.selected = (valueDistrict, valueUser) => {
  return valueUser === valueDistrict ? 'selected = "selected"' : "";
};

module.exports = helpers;

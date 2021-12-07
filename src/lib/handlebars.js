const helpers = {};

helpers.selected = (valueDistrict, valueUser) => {
  return valueUser === valueDistrict ? 'selected = "selected"' : "";
};

helpers.checked = (value, currentValue) => {
  return value == currentValue ? "checked" : "";
};

module.exports = helpers;

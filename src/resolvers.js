const _ = require('./utils');

/**
 * @param {array} list - The array to sort
 * @param {string} prop - The key from object
 * @returns {array} Returns array ordered according to the prop
 */
function orderBy(list = [], prop) {
  return list.sort((a, b) => parseFloat(a[prop]) - parseFloat(b[prop]));
};

/**
 * @param {string} argName - The key from object
 * @param {array} data - The array to filter
 * @param {string} value - The value to use for filter
 * @returns {array} Returns data filtered according to the prop
 */
const filterKey = (argName, customResolvers) => (data, value) => {
  const fnCustomResolver = _.prop(argName, customResolvers);
  if(fnCustomResolver) {
    return fnCustomResolver(data, value);
  }

  if(!data) {
    throw new Error(`Resolver "${argName}" does not exist.`)
  }

  return data.filter(item => _.prop(argName, item) == value);
};

/**
 * @param {Array} list - The array to query.
 * @returns {*} Returns the first element of `list`.
 */
const first = (list = []) => _.prop(0, list);

/**
 * @param {Array} list - The array to query.
 * @returns {*} Returns the last element of `list`.
 */
const last = (value = []) => _.last(value);

/**
 * @param {*} value - The value from data.
 * @param {string} prop - Default value to when `value` is undefined.
 * @returns {*} Returns `prop` when `value` is undefined if not it returns prop.
 */
const defaultValue = (value, prop) => {
  const number = Number(prop);
  const valueChanged = number ? number : prop;
  return _.isNil(value) ? valueChanged : value;
};

/**
 * @param {*} value - A value to parse.
 * @returns {*} Returns a new value parsed to number.
 */
const toNumber = (value) => {
  return Number(value) || value;
};

/**
 * @param {*} value - A value to parse.
 * @returns {*} Returns object parsed to array.
 */
const toArray = (value) => {
  const toIndividualKeys = _.pipe(
    _.toPairs,
    _.map(_.pipe(_.of, _.fromPairs))
  );

  return toIndividualKeys(value);
};

/**
 * @param {*} value - A value to parse.
 * @returns {array} Returns only values from object.
 */
const getObjectValues = (value) => {
  if(typeof(value) === 'object') {
    return Object.values(value)
  }

  return value
};

module.exports = {
  filterKey,
  orderBy,
  first,
  last,
  toNumber,
  defaultValue,
  toArray,
  getObjectValues
};
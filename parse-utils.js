/**
 * Parse a value as a string. Nullish values return an empty string.
 * @param {*} val 
 * @returns {string}
 */
export function parseString(val) {
  return val == null || val == undefined ? "" : val.toString();
}

/**
 * Parse a value as a number. Non-finite or non-numeric values return zero.
 * @param {*} val 
 * @returns {number}
 */
export function parseNumber(val) {
  return isFinite(val = Number(val)) ? val : 0;
}

/**
 * Parse a value as a boolean. Added for completeness' sake.
 * @param {*} val 
 * @returns {boolean}
 */
export function parseBoolean(val) {
  return Boolean(val);
}
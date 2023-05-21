import { parseString, parseNumber } from "./parse";

/**
 * Get the value of an `HTMLInputElement` as its appropriate data type. For number inputs, non-finite or non-numeric values return zero.
 * @param {HTMLInputElement} elem Element in question.
 * @returns {string | number | boolean} The element's value.
 */
export function getInputValue(elem) {
  if (elem.type == "checkbox") {
    return elem.checked;
  } else if (elem.type == "number") {
    return parseNumber(elem.valueAsNumber);
  } else {
    return elem.value;
  }
}

/**
 * Set the value of an `HTMLInputElement`, casting to its appropriate data type.
 * - For text inputs, nullish values are casted as an empty string.
 * - For number inputs, non-finite or non-numeric values are casted as zero.
 * @param {HTMLInputElement} elem Element in question.
 * @param {*} val Value to set.
 */
export function setInputValue(elem, val) {
  if (elem.type == "checkbox") {
    elem.checked = val;
  } else if (elem.type == "number") {
    elem.valueAsNumber = parseNumber(val);
  } else {
    elem.value = parseString(val);
  }
}

/**
 * Get the value of an element as its appropriate data type. Supports inputs, forms, and elements with a "value" property.
 * @param {Element} elem Element in question.
 * @returns {*} The element's value, or undefined.
 */
export function getElementValue(elem) {
  if (elem instanceof HTMLInputElement) {
    return getInputValue(elem);
  } else if (elem instanceof HTMLFormElement) {
    return getFormValue(elem);
  } else if ("value" in elem) {
    return elem.value;
  } else {
    return undefined;
  }
}

/**
 * Set the value of an element, casting to its assumed data type. Supports inputs, forms, and elements with a "value" property.
 * @param {Element} elem Element in question.
 * @param {*} val Value to set.
 */
export function setElementValue(elem, val) {
  if (elem instanceof HTMLInputElement) {
    setInputValue(elem, val);
  } else if (elem instanceof HTMLFormElement) {
    setFormValue(elem, val);
  } else if (typeof elem.value == "string") {
    elem.value = parseString(val);
  } else if ("value" in elem) {
    elem.value = val;
  }
}

/**
 * Get the value of a form's named elements as an object mapping each element name to its corresponding value.
 * @param {HTMLFormElement} form Form in question.
 * @returns {Object.<string, *>} Object map of element names to values.
 */
export function getFormValue(form) {
  let data = {};

  for (let child of form.elements) {
    if (!child.name) continue;

    data[child.name] = getElementValue(child);
  }

  return data;
}

/**
 * Set the value of a form's named elements from an object mapping each element name to a corresponding value.
 * @param {HTMLFormElement} form Form in question.
 * @param {*} data Object map of element names to values. Non-objects result in void functionality.
 */
export function setFormValue(form, data) {
  data = typeof data != "object" || data == null ? {} : data;

  for (let child of form.elements) {
    if (!child.name) continue;

    setElementValue(child, data[child.name]);
  }
}
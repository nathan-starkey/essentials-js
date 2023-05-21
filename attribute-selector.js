/**
 * Get all descendant elements that have a specific attribute.
 * @param {string} attr Valid attribute name to test for.
 * @param {Element} [parent] Element whose descendants will be tested. Defaults to document.
 * @returns {Element[]} Static array of elements that match the predicate.
 */
export function getElementsByAttr(attr, parent = document) {
  return Array.from(parent.querySelectorAll("[" + attr + "]"));
}

/**
 * Get all descendant elements that match a specific attribute value.
 * @param {string} attr Valid attribute name to match.
 * @param {string} val Attribute value to match.
 * @param {Element} [parent] Element whose descendants will be tested. Defaults to document.
 * @returns {Element[]} Static array of elements that match the predicate.
 */
export function getElementsByAttrVal(attr, val, parent = document) {
  return getElementsByAttr(attr, parent).filter(elem => elem.getAttribute(attr) == val);
}
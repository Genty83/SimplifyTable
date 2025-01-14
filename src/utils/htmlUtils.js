/**
 * htmlUtils.js
 * 
 * This module provides a collection of utility functions for manipulating HTML elements, attributes, events, and styles.
 * 
 * Features:
 * - Element Creation: Create any HTML element with specified attributes, events, styles, and children.
 * - Attribute Management: Set attributes on elements, including support for multiple attributes and toggling classes.
 * - Event Handling: Add event listeners to elements.
 * - Styling: Apply CSS styles to elements.
 * - Content Management: Set inner HTML and text content for elements.
 * - Child Element Management: Append and remove child elements from a parent element.
 * - Utility Functions: Includes functions for cloning elements, fetching JSON data, debouncing, and throttling functions.
 * 
 * Functions:
 * - createElement(tag): Creates an HTML element of the specified tag.
 * - setAttributes(element, attributes): Sets attributes on an element.
 * - addEventListeners(element, events): Adds event listeners to an element.
 * - applyStyles(element, styles): Applies CSS styles to an element.
 * - appendChildren(element, children): Appends child elements to an element.
 * - setTextContent(element, textContent): Sets the text content of an element.
 * - toggleClasses(element, classes): Toggles specified classes on an element.
 * - setMultipleAttributes(element, attributes): Sets multiple attributes on an element.
 * - removeAllChildren(element): Removes all child elements from an element.
 * - cloneElement(element): Clones an element along with its children.
 * - setInnerHTML(element, html): Sets the inner HTML of an element.
 * - fetchJSON(url): Fetches JSON data from a specified URL.
 * - debounce(func, wait): Debounces a function to limit its execution rate.
 * - throttle(func, limit): Throttles a function to limit its execution rate.
 * - createBaseElement(options): Creates a highly flexible base element with specified options.
 * 
 * Example Usage:
 * ```javascript
 * import { createBaseElement } from './htmlUtils';
 * 
 * const button = createBaseElement({
 *     tag: 'button',
 *     attributes: { id: 'myButton', class: 'btn' },
 *     styles: { backgroundColor: 'coral', color: 'white', padding: '10px 20px' },
 *     textContent: 'Click Me!',
 *     events: { click: () => alert('Button clicked!') }
 * });
 * 
 * document.body.appendChild(button);
 * ```
 */


/**
 * Create an HTML element.
 *
 * @param {string} tag - The type of HTML element to create.
 * @returns {HTMLElement} - The created HTML element.
 */
export function createElement(tag) {
  return document.createElement(tag);
}

/**
 * Set attributes on an element.
 *
 * @param {HTMLElement} element - The element to set attributes on.
 * @param {Object} attributes - The attributes to set.
 */
export function setAttributes(element, attributes) {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
}

/**
 * Add event listeners to an element.
 *
 * @param {HTMLElement} element - The element to add event listeners to.
 * @param {Object} events - The events to attach.
 */
export function addEventListeners(element, events) {
  Object.keys(events).forEach((event) => {
    element.addEventListener(event, events[event]);
  });
}

/**
 * Apply CSS styles to an element.
 *
 * @param {HTMLElement} element - The element to apply styles to.
 * @param {Object} styles - The styles to apply.
 */
export function applyStyles(element, styles) {
  Object.keys(styles).forEach((style) => {
    element.style[style] = styles[style];
  });
}

/**
 * Append child elements to an element.
 *
 * @param {HTMLElement} element - The parent element.
 * @param {Array} children - The child elements to append.
 */
export function appendChildren(element, children) {
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
}

/**
 * Set the text content of an element.
 *
 * @param {HTMLElement} element - The element to set text content on.
 * @param {string} textContent - The text content to set.
 */
export function setTextContent(element, textContent) {
  if (textContent) {
    element.textContent = textContent;
  }
}

/**
 * Toggle classes on an element.
 *
 * @param {HTMLElement} element - The element to toggle classes on.
 * @param {Array} classes - The classes to toggle.
 */
export function toggleClasses(element, classes) {
  classes.forEach((cls) => {
    element.classList.toggle(cls);
  });
}

/**
 * Set multiple attributes on an element.
 *
 * @param {HTMLElement} element - The element to set attributes on.
 * @param {Array} attributes - An array of attribute objects.
 */
export function setMultipleAttributes(element, attributes) {
  attributes.forEach((attr) => {
    element.setAttribute(attr.name, attr.value);
  });
}

/**
 * Remove all child elements from an element.
 *
 * @param {HTMLElement} element - The element to remove children from.
 */
export function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Clone an element.
 *
 * @param {HTMLElement} element - The element to clone.
 * @returns {HTMLElement} - The cloned element.
 */
export function cloneElement(element) {
  return element.cloneNode(true);
}

/**
 * Set the inner HTML of an element safely.
 *
 * @param {HTMLElement} element - The element to set inner HTML on.
 * @param {string} html - The HTML string to set.
 */
export function setInnerHTML(element, html) {
  element.innerHTML = html;
}

/**
 * Fetch JSON data from a URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise} - A promise that resolves to the fetched data.
 */
export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

/**
 * Debounce a function.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to wait.
 * @returns {Function} - The debounced function.
 */
export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

/**
 * Throttle a function.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The time limit in milliseconds.
 * @returns {Function} - The throttled function.
 */
export function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * Create a highly flexible base element.
 *
 * @param {Object} options - The options for creating the element.
 * @param {string} options.tag - The type of HTML element to create.
 * @param {Object} [options.attributes] - The attributes to set on the element.
 * @param {Object} [options.events] - The events to attach to the element.
 * @param {Object} [options.styles] - The CSS styles to apply to the element.
 * @param {Array} [options.children] - The child elements to append to the element.
 * @param {string} [options.textContent] - The text content to set for the element.
 * @param {boolean} [options.render] - Conditional rendering flag.
 * @returns {HTMLElement} - The created HTML element.
 */
export function createBaseElement({
  tag,
  attributes = {},
  events = {},
  styles = {},
  children = [],
  textContent = "",
  render = true,
}) {
  if (!render) return null;

  const element = createElement(tag);

  setAttributes(element, attributes);
  addEventListeners(element, events);
  applyStyles(element, styles);
  appendChildren(element, children);
  setTextContent(element, textContent);

  return element;
}

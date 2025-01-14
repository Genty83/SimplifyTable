/**
 * @module ToastModule
 * 
 * @description
 * This module provides a `Toast` class for creating and displaying toast notifications
 * within a specified container element. Toast notifications are small messages that
 * appear temporarily to provide feedback to the user about the success, error, or warning
 * events in the application.
 * 
 * @features
 * - **Toast Notifications**: Display brief messages for different types of events (success, error, warning, info).
 * - **Automatic Dismissal**: Toasts automatically disappear after a set duration.
 * - **Manual Dismissal**: Users can manually dismiss toasts by clicking on them.
 * - **Customizable Icons**: Each toast type is represented with an appropriate icon.
 * 
 * @example
 * // Import the necessary module
 * import { Toast } from "./ToastModule";
 * 
 * // Create a new toast instance
 * const toastContainer = document.getElementById("toast-container");
 * const toast = new Toast(toastContainer);
 * 
 * // Display a success toast
 * toast.showToast("Operation successful!", "success");
 * 
 * // Display an error toast
 * toast.showToast("An error occurred.", "error");
 * 
 * // Display a warning toast
 * toast.showToast("Warning: Check your input.", "warning");
 * 
 * // Display an informational toast
 * toast.showToast("Here is some information.", "info");
 */


// Imports
import { createBaseElement } from "./htmlUtils.js";

export class Toast {
  /**
   * Creates an instance of Toast.
   * @param {HTMLElement} container - The container element for toast messages.
   */
  constructor(container) {
    /**
     * @property {HTMLElement} container - The container element for toast messages.
     */
    this.container = container;
  }

  /**
   * Displays a toast message.
   * @param {string} message - The message to display.
   * @param {string} type - The type of toast (e.g., 'success', 'error', 'warning').
   */
  showToast(message, type) {
    const toastElement = this.createToast(message, type);
    this.container.appendChild(toastElement);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      if (this.container.contains(toastElement)) {
        this.container.removeChild(toastElement);
      }
    }, 3000);
  }

  /**
   * Creates a toast element.
   * @param {string} message - The message to display.
   * @param {string} type - The type of toast (e.g., 'success', 'error', 'warning').
   * @returns {HTMLElement} - The toast element.
   */
  createToast(message, type) {
    const toastElement = createBaseElement("div", {
      className: `toast toast-${type}`,
    });

    const iconElement = this.toastIcons(type);
    const messageElement = createBaseElement("div", {
      className: "toast-message",
    });
    messageElement.textContent = message;

    toastElement.appendChild(iconElement);
    toastElement.appendChild(messageElement);

    return toastElement;
  }

  /**
   * Returns the appropriate icon for the toast type.
   * @param {string} type - The type of toast (e.g., 'success', 'error', 'warning').
   * @returns {HTMLElement} - The icon element.
   */
  toastIcons(type) {
    const iconElement = createBaseElement("i", {
      className: "fas",
    });

    iconElement.addEventListener("click", () => {
      this.closeToast(iconElement.parentElement);
    });

    switch (type) {
      case "success":
        iconElement.classList.add("fa-check-circle");
        break;
      case "error":
        iconElement.classList.add("fa-exclamation-circle");
        break;
      case "warning":
        iconElement.classList.add("fa-exclamation-triangle");
        break;
      default:
        iconElement.classList.add("fa-info-circle");
    }

    return iconElement;
  }

  /**
   * Closes the specified toast element.
   * @param {HTMLElement} toastElement - The toast element to close.
   */
  closeToast(toastElement) {
    if (this.container.contains(toastElement)) {
      this.container.removeChild(toastElement);
    }
  }
}

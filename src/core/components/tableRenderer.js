
// Imports
import { createBaseElement } from "../../utils/htmlUtils.js";

/**
 * Class representing a TableRenderer.
 * This class handles rendering a table with pagination, search, and other controls.
 */
export class TableRenderer {
  /**
   * Create a TableRenderer.
   * @param {Object} options - Configuration options for the table renderer.
   * @param {string} options.containerId - The ID of the container element where the table will be rendered.
   * @param {string} options.tableId - The ID for the table element.
   */
  constructor(options = {}) {
    this.container = document.getElementById(options.containerId);
    this.tableId = options.tableId;

    // List of options for rows per page dropdown.
    this.rowsPerPageList = [5, 10, 20, 50, 100, 500, 1000];
  }

  /**
   * Render the table and associated elements.
   */
  renderElements() {
    this.createTopContainerElements();
    this.createActionContainerElements();
    this.createTableElements();
    this.createBottomContainerElements();
  }

  /**
   * Create elements for the top container, including search and table options.
   */
  createTopContainerElements() {
    this.topContainer = createBaseElement({
      tag: "div",
      attributes: { class: "top-container" },
    });

    this.rowsPerPageParagraph = createBaseElement({
      tag: "p",
      attributes: { class: "rows-per-page" },
      textContent: "Showing Rows 0 - 0 of 0",
    });

    this.topRightContainer = createBaseElement({
      tag: "div",
      attributes: { class: "top-right-container" },
    });

    this.topContainer.appendChild(this.rowsPerPageParagraph);
    this.topContainer.appendChild(this.topRightContainer);

    this.searchbar = createBaseElement({
      tag: "input",
      attributes: {
        type: "text",
        placeholder: "Search...",
        class: "searchbar table-control",
      },
    });

    this.topMenuContainer = createBaseElement({
      tag: "div",
      attributes: { class: "top-menu-container" },
    });

    // Conditionally add the search bar if enabled.
    if (this.hasSearch) {
      this.topRightContainer.appendChild(this.searchbar);
    }

    // Conditionally add the table options menu if enabled.
    if (this.hasTableOptions) {
      this.topRightContainer.appendChild(this.topMenuContainer);
    }

    this.container.appendChild(this.topContainer);
  }

  /**
   * Create elements for the action container, such as the loader.
   */
  createActionContainerElements() {
    this.actionContainer = createBaseElement({
      tag: "div",
      attributes: { class: "action-container" },
    });

    this.loader = createBaseElement({
      tag: "div",
      attributes: { class: "loader" },
    });

    this.actionContainer.appendChild(this.loader);
    this.container.appendChild(this.actionContainer);
  }

  /**
   * Create table elements including thead and tbody.
   */
  createTableElements() {
    this.middleContainer = createBaseElement({
      tag: "div",
      attributes: { class: "middle-container" },
    });

    this.table = createBaseElement({
      tag: "table",
      attributes: { id: this.tableId },
    });

    this.thead = createBaseElement({ tag: "thead" });
    this.tbody = createBaseElement({ tag: "tbody" });

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.middleContainer.appendChild(this.table);

    this.container.appendChild(this.middleContainer);
  }

  /**
   * Create elements for the bottom container, 
   * including pagination controls and rows per page dropdown.
   */
  createBottomContainerElements() {
    this.bottomContainer = createBaseElement({
      tag: "div",
      attributes: { class: "bottom-container" },
    });

    this.bottomLeftContainer = createBaseElement({
      tag: "div",
      attributes: { class: "flex-row base-gap align-center" },
    });

    this.rowsPerPageLabel = createBaseElement({
      tag: "label",
      attributes: { for: "rows-per-page", textContent: "Rows per page:" },
      textContent: "Rows per page:",
    });

    this.rowsPerPageSelect = createBaseElement({
      tag: "select",
      attributes: { class: "table-control rows-per-page", id: "rows-per-page" },
      children: this.rowsPerPageList.map((value) =>
        createBaseElement({
          tag: "option",
          attributes: { value: value },
          textContent: value,
        })
      ),
    });

    this.bottomLeftContainer.appendChild(this.rowsPerPageLabel);
    this.bottomLeftContainer.appendChild(this.rowsPerPageSelect);

    this.paginationContainer = createBaseElement({
      tag: "div",
      attributes: { class: "pagination-container" },
    });

    this.bottomRightContainer = createBaseElement({
      tag: "div",
      attributes: { class: "flex-row align-center base-gap" },
    });

    this.gotoPageLabel = createBaseElement({
      tag: "label",
      attributes: { for: "goto-page", textContent: "Go to page:" },
      textContent: "Go to page:",
    });

    this.gotoPageSelect = createBaseElement({
      tag: "select",
      attributes: { class: "table-control goto-page", id: "goto-page" },
    });

    this.bottomRightContainer.appendChild(this.gotoPageLabel);
    this.bottomRightContainer.appendChild(this.gotoPageSelect);

    this.bottomContainer.appendChild(this.bottomLeftContainer);
    this.bottomContainer.appendChild(this.paginationContainer);
    this.bottomContainer.appendChild(this.bottomRightContainer);

    this.container.appendChild(this.bottomContainer);
  }
}

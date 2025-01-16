
// Imports
import { createBaseElement } from "../../utils/htmlUtils.js";

export class HeaderRenderer {
  constructor(tableInstance, options = {}) {
    this.tableInstance = tableInstance;
    this.options = options;

    this.createHeaderRow();
  }

  createHeaderRow() {
    this.headerRow = createBaseElement(
      {
        tag: "tr",
        attributes: {
          class: "table-header-row",
        },
      }
    );
    return this.headerRow;
  }

  createFirstHeader() {
    this.firstHeader = createBaseElement(
      {
        tag: "th",
        attributes: {
          class: "first-header table-header",
        },
        children: [
          createBaseElement(
            {
              tag: "input",
              attributes: {
                type: "checkbox",
                class: "select-all table-checkbox",
              }
            }
          )
        ]
      }
    )
    return this.firstHeader;
  }

  createHeader(data) {
    const header = createBaseElement(
      {
        tag: "th",
        attributes: {
          class: "table-header",
        },
      }
    );

    // Add header title
    header.appendChild(this.createHeaderTitle(data));
    header.appendChild(this.createHeaderContent());

    return header;
  }

  createHeaderTitle(data) {
    const headerTitle = createBaseElement(
      {
        tag: "div",
        attributes: {
          class: "header-title flex-row align-center justify-between",
        },
        children: [
          createBaseElement(
            {
              tag: "span",
              attributes: {
                class: "header-text",
              },
              textContent: data,
            }
          ),
          createBaseElement(
            {
              tag: "button",
              attributes: {
                class: "header-sort-btn",
              },
              children: [
                createBaseElement(
                  {
                    tag: "i",
                    attributes: {
                      class: "fas fa-sort",
                    }
                  }
                )
              ]
            }
          )
        ]
      }
    );

    return headerTitle;
  }

  createHeaderContent() {
    const headerContent = createBaseElement(
      {
        tag: "div",
        attributes: {
          class: "header-content flex-col base-gap",
        },
        children: [
          createBaseElement(
            {
              tag: "input",
              attributes: {
                type: "text",
                class: "table-control",
                placeholder: "Search...",
              }
            }
          ),
          createBaseElement(
            {
              tag: "select",
              attributes: {
                class: "table-control",
              },
              // Will add children options here
            }
          )
        ]
      }
    );
    return headerContent;
  }
}
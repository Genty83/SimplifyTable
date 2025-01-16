// Imports
import { createBaseElement } from "../../utils/htmlUtils.js";

export class HeaderRenderer {
  constructor(tableInstance, options = {}) {
    this.tableInstance = tableInstance;
    this.options = options;

    this.createHeaderRow();
    this.createBottomBorder();
  }

  createHeaderRow() {
    this.headerRow = createBaseElement({
      tag: "tr",
      attributes: {
        class: "table-header-row",
      },
    });
    
    return this.headerRow;
  }

  createFirstHeader() {
    this.firstHeader = createBaseElement({
      tag: "th",
      attributes: {
        class: "first-header table-header",
      },
      children: [
        createBaseElement({
          tag: "input",
          attributes: {
            type: "checkbox",
            class: "select-all table-checkbox",
          },
        }),
      ],
    });
    return this.firstHeader;
  }

  createHeader(data, uniqueValues) {
    const header = createBaseElement({
      tag: "th",
      attributes: {
        class: "table-header",
      },
      children: [
        createBaseElement({
          tag: "div",
          attributes: {
            class: "header flex-col base-gap",
          },
        }),
      ],
    });
    // Add header title
    header.firstChild.appendChild(this.createHeaderTitle(data));
    header.firstChild.appendChild(this.createHeaderContent(data, uniqueValues));

    return header;
  }

  createHeaderTitle(data) {
    const headerTitle = createBaseElement({
      tag: "div",
      attributes: {
        class: "header-title flex-row align-center justify-between",
      },
      children: [
        createBaseElement({
          tag: "span",
          attributes: {
            class: "header-text",
          },
          textContent: data,
        }),
        createBaseElement({
          tag: "button",
          attributes: {
            class: "header-sort-btn",
          },
          children: [
            createBaseElement({
              tag: "i",
              attributes: {
                class: "fas fa-sort",
              },
            }),
          ],
        }),
      ],
    });

    return headerTitle;
  }

  createHeaderContent(data, uniqueValues) {
    const headerContent = createBaseElement({
      tag: "div",
      attributes: {
        class: "header-content flex-col base-gap",
      },
      children: [
        createBaseElement({
          tag: "input",
          attributes: {
            type: "text",
            class: "table-control",
            placeholder: "Search...",
          },
        }),
        this.createSelectElement(data, uniqueValues),
      ],
    });
    return headerContent;
  }

  createSelectElement(headerName, uniqueValues) {
    const selectElement = createBaseElement({
      tag: "select",
      attributes: {
        class: "table-control",
      },
      children: [
        createBaseElement({
          tag: "option",
          attributes: {
            value: "",
            disabled: true,
          },
          textContent: `Filter by ${headerName}`,
        }),
        ...uniqueValues.map(value => 
          createBaseElement({
            tag: "option",
            attributes: {
              value: value,
            },
            textContent: value,
          })
        ),
      ],
    });
    return selectElement;
  }

  createBottomBorder() {
    const bottomBorder = createBaseElement({
      tag: "div",
      attributes: {
        class: "header-bottom-border",
      },
    });
    this.tableInstance.thead.appendChild(bottomBorder);
  }
}

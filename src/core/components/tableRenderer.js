import { createBaseElement } from "../../utils/htmlUtils.js";

export class TableRenderer {
  constructor(options = {}) {
    this.container = document.getElementById(options.containerId);
    this.tableId = options.tableId;
  }

  createBaseContainers() {
    this.topContainer = createBaseElement({
      tag: "div",
      attributes: { class: "top-container" },
    });
    this.actionContainer = createBaseElement({
      tag: "div",
      attributes: { class: "action-container" },
    });
    this.tableContainer = createBaseElement({
      tag: "div",
      attributes: { class: "table-container" },
    });
    this.bottomContainer = createBaseElement({
      tag: "div",
      attributes: { class: "bottom-container" },
    });

    this.container.appendChild(this.topContainer);
    this.container.appendChild(this.actionContainer);
    this.container.appendChild(this.tableContainer);
    this.container.appendChild(this.bottomContainer);
  }

  createTable() {
    this.table = createBaseElement({
      tag: "table",
      attributes: {
        id: this.tableId,
        class: "table",
      },
    });
    this.thead = createBaseElement({
      tag: "thead",
    });
    this.tbody = createBaseElement({
      tag: "tbody",
    });

    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);

    this.tableContainer.appendChild(this.table);
  }
}

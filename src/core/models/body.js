
// Imports
import { BodyRenderer } from "../components/bodyRenderer.js";

export class Body extends BodyRenderer {
  constructor(tableInstance, options = {}) {
    super(tableInstance, options);
    this.tableInstance = tableInstance;
    this.options = options;
  }

  getResultsArray() {
    return Array.isArray(this.tableInstance.data?.results)
      ? this.tableInstance.data.results
      : [this.tableInstance.data.results];
  }

  getDataToRender(rowData) {
    return this.tableInstance.columnsToDisplay.length
      ? this.tableInstance.columnsToDisplay.map((column) => rowData[column])
      : Object.values(rowData);
  }

  renderBody() {
    this.clearBody();
    const fragment = document.createDocumentFragment();

    this.getResultsArray().forEach((rowData) => {
      const row = this.createRow(this.getDataToRender(rowData));
      fragment.appendChild(row);
    });

    this.tableInstance.tbody.appendChild(fragment);
  }

  clearBody() {
    this.tableInstance.tbody.innerHTML = "";
  }
}
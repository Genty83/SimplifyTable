import { HeaderRenderer } from "../components/headerRenderer.js";

export class Header extends HeaderRenderer {
  constructor(tableInstance, options = {}) {
    super(tableInstance, options);
    this.tableInstance = tableInstance; 
    this.options = options;
  }

  /**
   * Renders the table headers.
   * @param {Object} uniqueColumnValues - An object containing unique values for each column.
   */
  renderHeaders(uniqueColumnValues) {
    this.tableInstance.thead.innerHTML = "";

    this.tableInstance.thead.appendChild(this.headerRow);
    
    this.headerRow.appendChild(this.createFirstHeader());
    this.tableInstance.headers.forEach(header => {
      const headerElement = this.createHeader(header, uniqueColumnValues[header]);

      this.headerRow.appendChild(headerElement);
    });
  }
}

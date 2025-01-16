import { HeaderRenderer } from "../components/headerRenderer.js";

export class Header extends HeaderRenderer {
  constructor(tableInstance, options = {}) {
    super(tableInstance, options);
    this.tableInstance = tableInstance; 
    this.options = options;
  }

  /**
   * Renders the table headers.
   */
  renderHeaders() {
    this.tableInstance.thead.innerHTML = "";

    this.tableInstance.thead.appendChild(this.headerRow);
    
    this.headerRow.appendChild(this.createFirstHeader());
    this.tableInstance.headers.forEach(header => {
      const headerElement = this.createHeader(header);
      this.headerRow.appendChild(headerElement);
    });

  }
}
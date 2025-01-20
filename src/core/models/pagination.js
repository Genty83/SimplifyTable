import { PaginationRenderer } from "../components/paginationRenderer.js";

export class Pagination extends PaginationRenderer {
  constructor(tableInstance, options) {
    super(tableInstance, options);
    this.tableInstance = tableInstance;
    this.options = options;
    this.currentPage = tableInstance.currentPage;

    // Render the pagination controls
    this.updatePagination();
  }

  updatePagination() {
    // Call the renderPagination method from the parent class
    this.renderPagination();

    // Add event listeners to the pagination controls
    const paginationControls = document.querySelectorAll('.pagination-control');
    paginationControls.forEach((control) => {
      control.addEventListener('click', (event) => {
        const newPage = parseInt(event.target.getAttribute('data-page'), 10);
        this.changePage(newPage);
      });
    });
  }

  changePage(newPage) {
    if (newPage === '...') {
      return;
    }

    this.currentPage = newPage;
    this.tableInstance.currentPage = newPage;
    this.tableInstance.updateBody();
    this.renderPagination();
  }
}

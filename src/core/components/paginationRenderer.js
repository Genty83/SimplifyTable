import { createBaseElement } from "../../utils/htmlUtils.js";

export class PaginationRenderer {
  constructor(tableInstance, options) {
    this.tableInstance = tableInstance;
    this.options = options;
    this.currentPage = 1;
    this.updateTotalPages();
  }

  updateRowsPerPage(rowsPerPage) {
    this.tableInstance.rowsPerPage = rowsPerPage;
    this.updateTotalPages();
    this.currentPage = 1;
    this.renderPagination();
    this.tableInstance.updateBody();
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(
      this.tableInstance.data.totalResults / this.tableInstance.rowsPerPage
    );
  }

  renderPagination() {
    const paginationContainer = this.tableInstance.paginationContainer;
    this.updateTotalPages();

    if (!paginationContainer) {
      console.error("Pagination container not found");
      return;
    }

    paginationContainer.innerHTML = "";

    if (this.totalPages <= 1) {
      return;
    }

    const buttons = this.getPaginationButtons();

    buttons.forEach((buttonConfig) => {
      const button = this.createButton(
        buttonConfig.text,
        buttonConfig.page,
        buttonConfig.active
      );
      paginationContainer.appendChild(button);
    });
  }

  createButton(text, page, isActive) {
    const button = createBaseElement({
      tag: "button",
      attributes: {
        class: `pagination-btn ${isActive ? "pagination-active" : ""}`.trim(),
      },
      textContent: text,
    });

    button.addEventListener("click", () => {
      this.changePage(page);
    });

    return button;
  }

  getPaginationButtons() {
    const buttons = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const delta = 2;

    if (currentPage > 1) {
      buttons.push({ text: "First", page: 1 });
      buttons.push({ text: "Prev", page: currentPage - 1 });
    }

    const range = {
      start: Math.max(1, currentPage - delta),
      end: Math.min(totalPages, currentPage + delta),
    };

    for (let i = range.start; i <= range.end; i++) {
      buttons.push({ text: i, page: i, active: i === currentPage });
    }

    if (range.start > 2) {
      buttons.unshift({ text: "...", page: null });
      buttons.unshift({ text: "1", page: 1 });
    }

    if (range.end < totalPages - 1) {
      buttons.push({ text: "...", page: null });
      buttons.push({ text: totalPages.toString(), page: totalPages });
    }

    if (currentPage < totalPages) {
      buttons.push({ text: "Next", page: currentPage + 1 });
      buttons.push({ text: "Last", page: totalPages });
    }

    return buttons;
  }

  changePage(newPage) {
    if (!newPage || newPage < 1 || newPage > this.totalPages) {
      return;
    }

    this.currentPage = parseInt(newPage, 10);
    this.tableInstance.currentPage = this.currentPage;
    this.tableInstance.updateBody();
    this.renderPagination();
  }
}

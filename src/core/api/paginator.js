/**
 * Paginator Module
 *
 * Overview:
 * This module provides functionality for paginating a set of results and generating pagination buttons. 
 * It consists of two main classes: `Paginator` and `PaginationButtons`. 
 * The `Paginator` class handles the slicing of the results based on the pagination parameters and returns a paginated result set. 
 * The `PaginationButtons` class generates an array of pagination button labels based on the current page and various optional parameters.
 *
 * Features:
 * - Paginate large sets of results into smaller chunks for easier browsing.
 * - Customize the number of results displayed per page.
 * - Navigate through paginated results using next/previous buttons.
 * - Display first and last page buttons for quick navigation to the beginning or end of the result set.
 * - Optionally show ellipsis (`...`) to indicate truncated page ranges.
 * - Display a customizable number of page buttons on each side of the current page.
 * - Customize the number of page buttons shown at the beginning and end of the result set.
 *
 * Classes:
 * - Paginator: Handles the pagination of results and returns a paginated result set.
 * - PaginationButtons: Generates pagination button labels based on the current page and optional parameters.
 *
 * Usage:
 * To use this module, create an instance of the `Paginator` class by passing the results, 
 * headers, pagination parameters, and optional parameters. Then, call the `paginate` method to get the paginated result set and pagination buttons.
 *
 * Example:
 * const paginator = new Paginator(results, headers, { page: 1, limit: 10 }, { onEachSide: 2, ellipsis: true });
 * const paginatedResults = paginator.paginate();
 * console.log(paginatedResults);
 */

/**
 * Paginator class for paginating results.
 */
export default class Paginator {
  /**
   * Constructor for the Paginator class.
   * @param {Array} results - Array of results to paginate.
   * @param {Object} headers - Headers associated with the results.
   * @param {Object} params - Pagination parameters.
   * @param {number} params.page - Current page number (default: 1).
   * @param {number} params.limit - Number of results per page (default: 10).
   * @param {Object} optionalParams - Optional pagination parameters.
   * @param {number} optionalParams.onEachSide - Number of pages to display on each side of the current page (default: 1).
   * @param {number} optionalParams.onEnds - Number of pages to display at the beginning and end (default: 1).
   * @param {boolean} optionalParams.ellipsis - Whether to display ellipsis for truncated page ranges (default: true).
   * @param {boolean} optionalParams.firstLastButtons - Whether to display first and last buttons (default: true).
   * @param {boolean} optionalParams.prevNextButtons - Whether to display previous and next buttons (default: true).
   */
  constructor(results, headers, params = {}, optionalParams = {}) {
    this.results = results;
    this.headers = headers;
    this.params = {
      page: params.page || 1,
      limit: params.limit || 10,
    };
    this.optionalParams = {
      onEachSide: optionalParams.onEachSide || 1,
      onEnds: optionalParams.onEnds || 1,
      ellipsis: optionalParams.ellipsis || true,
      firstLastButtons: optionalParams.firstLastButtons || true,
      prevNextButtons: optionalParams.prevNextButtons || true,
    };

    this.count = this.results.length;
  }

  /**
   * Paginate the results based on the current parameters.
   * @returns {Object} - The paginated results.
   */
  paginate() {
    const { page, limit } = this.params;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, this.count);
    // The pagination object to be returned
    const paginatedResults = {
      page: page,
      limit: limit,
      count: this.count,
      next: endIndex < this.count ? page + 1 : null,
      previous: startIndex > 0 ? page - 1 : null,
      results: this.results.slice(startIndex, endIndex),
      headers: this.headers,
      totalPages: Math.ceil(this.count / limit),
      buttons: new PaginationButtons(this, this.optionalParams).generate(),
    };
    return paginatedResults;
  }
}

/**
 * PaginationButtons class for generating pagination buttons.
 */
class PaginationButtons {
  /**
   * Constructor for the PaginationButtons class.
   * @param {Paginator} paginator - The paginator instance.
   * @param {Object} params - Pagination button parameters.
   * @param {number} params.onEachSide - Number of pages to display on each side of the current page (default: 1).
   * @param {number} params.onEnds - Number of pages to display at the beginning and end (default: 1).
   * @param {boolean} params.ellipsis - Whether to display ellipsis for truncated page ranges (default: true).
   * @param {boolean} params.firstLastButtons - Whether to display first and last buttons (default: true).
   * @param {boolean} params.prevNextButtons - Whether to display previous and next buttons (default: true).
   */
  constructor(paginator, params = {}) {
    this.paginator = paginator;
    this.params = {
      onEachSide: params.onEachSide || 1,
      onEnds: params.onEnds || 1,
      ellipsis: params.ellipsis || true,
      firstLastButtons: params.firstLastButtons || true,
      prevNextButtons: params.prevNextButtons || true,
    };
  }

  /**
   * Generate the pagination buttons based on the current parameters.
   * @returns {Array} - Array of pagination button labels.
   */
  generate() {
    const buttons = [];
    const totalPages = Math.ceil(
      this.paginator.count / this.paginator.params.limit
    );
    const currentPage = this.paginator.params.page;
    const startPage = Math.max(1, currentPage - this.params.onEachSide);
    const endPage = Math.min(totalPages, currentPage + this.params.onEachSide);

    if (this.params.firstLastButtons && currentPage > 1) {
      buttons.push("first");
      buttons.push("next");
    }

    if (this.params.ellipsis && currentPage > this.params.onEachSide) {
      for (let i = startPage - this.params.onEnds; i < startPage; i++) {
        if (i > 1) {
          buttons.push(i.toString());
        }
      }
      buttons.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i.toString());
    }

    if (
      this.params.ellipsis &&
      currentPage < totalPages - this.params.onEachSide
    ) {
      buttons.push("...");
      for (let i = endPage + 1; i <= endPage + this.params.onEnds; i++) {
        if (i < totalPages) {
          buttons.push(i.toString());
        }
      }
    }

    if (this.params.firstLastButtons && currentPage < totalPages) {
      buttons.push("prev");
      buttons.push("last");
    }

    return buttons;
  }
}

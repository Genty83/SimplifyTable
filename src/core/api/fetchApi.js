/**
 * FetchApi Module
 *
 * Overview:
 * This module provides functionality for fetching data from a specified URL and converting it into a paginated format. 
 * The main focus of this module is to handle fetching CSV data and paginate the results for easier consumption. 
 * It includes the `FetchApi` class which manages the fetching and pagination process.
 *
 * Features:
 * - Fetch CSV data from a specified URL.
 * - Handle errors gracefully during the fetching process.
 * - Paginate the fetched data into manageable chunks.
 * - Customize pagination parameters such as the number of pages on each side, ellipsis, and first/last buttons.
 *
 * Classes:
 * - FetchApi: Handles fetching data and paginating the results.
 *
 * Usage:
 * To use this module, create an instance of the `FetchApi` class by passing the URL, fetch type, and pagination parameters.
 * Then, call the `fetchData` method to retrieve and paginate the data.
 *
 * Example:
 * const fetchApi = new FetchApi('https://example.com/data.csv');
 * fetchApi.fetchData(1, 10).then(data => console.log(data)).catch(error => console.error(error));
 */

/**
 * FetchApi class for fetching and paginating data.
 */
export default class FetchApi {
  /**
   * Constructor for the FetchApi class.
   * @param {string} url - The URL of the data to fetch.
   * @param {string} fetchType - The type of data to fetch (default: "csv").
   * @param {Object} paginationParams - Pagination parameters.
   * @param {number} paginationParams.onEachSide - Number of pages to display on each side of the current page (default: 1).
   * @param {number} paginationParams.onEnds - Number of pages to display at the beginning and end (default: 1).
   * @param {boolean} paginationParams.ellipsis - Whether to display ellipsis for truncated page ranges (default: true).
   * @param {boolean} paginationParams.firstLastButtons - Whether to display first and last buttons (default: true).
   * @param {boolean} paginationParams.prevNextButtons - Whether to display previous and next buttons (default: true).
   */
  constructor(url, fetchType = "csv", paginationParams = {}) {
    this.url = url;
    this.fetchType = fetchType;
    this.paginationParams = {
      onEachSide: paginationParams.onEachSide || 1,
      onEnds: paginationParams.onEnds || 1,
      ellipsis: paginationParams.ellipsis || true,
      firstLastButtons: paginationParams.firstLastButtons || true,
      prevNextButtons: paginationParams.prevNextButtons || true,
    };
  }

  /**
   * Fetch data from the specified URL based on the fetch type and paginate the results.
   * @param {number} page - The current page number (default: 1).
   * @param {number} limit - The number of results per page (default: 10).
   * @returns {Promise<Object>} - A promise that resolves to the paginated data.
   * @throws {Error} - Throws an error if the fetch type is invalid.
   */
  async fetchData(page = 1, limit = 10) {
    if (this.fetchType === "csv") {
      return this.fetchCsv(page, limit);
    } else {
      throw new Error("Invalid fetch type");
    }
  }

  /**
   * Fetch CSV data from the specified URL and paginate the results.
   * @param {number} page - The current page number (default: 1).
   * @param {number} limit - The number of results per page (default: 10).
   * @returns {Promise<Object>} - A promise that resolves to the paginated CSV data.
   * @throws {Error} - Throws an error if there is an issue fetching the CSV data.
   */
  async fetchCsv(page = 1, limit = 10) {
    try {
      const csvFetcher = new CsvFetcher(this.url);
      const data = await csvFetcher.fetch();
      const paginator = new Paginator(
        data,
        csvFetcher.headers,
        { page, limit },
        this.paginationParams
      );
      return paginator.paginate();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching CSV data");
    }
  }
}

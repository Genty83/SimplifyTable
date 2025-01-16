// Css Import
//import '../../static/styles/simplify.css';

// Imports
import { TableRenderer } from "../components/tableRenderer.js";
import { FetchData } from "../api/fetchApi.js";
import { Header } from "./headers.js";
import { Body } from "./body.js";

/**
 * SimplifyTable class for creating and managing a dynamic, interactive table.
 *
 * @param {Object} options - Configuration options for the table.
 * @param {string} options.containerId - The id of the HTML element to contain the table.
 * @param {string} options.tableId - A unique identifier for the table.
 * @param {string} options.url - The URL to fetch data from.
 * @param {boolean} options.hasTableOptions - Flag to indicate if table options are enabled.
 * @param {boolean} options.hasHeaderOptions - Flag to indicate if header options are enabled.
 * @param {boolean} options.hasPagination - Flag to indicate if pagination is enabled.
 * @param {boolean} options.hasSearch - Flag to indicate if search functionality is enabled.
 * @param {boolean} options.editableCells - Flag to indicate if cells are editable.
 * @param {string} options.themePath - The path to the theme json file for the table.
 * @param {Number} options.rowsPerPage - The number of rows per page.
 */
export class SimplifyTable extends TableRenderer {
  constructor(options = {}) {
    super(options);
    // Set default options
    this.containerId = options.containerId || "simplify-table";
    this.tableId = options.tableId || "table-id";
    this.url = options.url || "default-url";
    this.hasTableOptions = options.hasTableOptions || false;
    this.hasHeaderOptions = options.hasHeaderOptions || false;
    this.hasPagination = options.hasPagination || false;
    this.hasSearch = options.hasSearch || false;
    this.editableCells = options.editableCells || false;
    this.themePath = options.themePath || "defaultLight.json";
    this.rowsPerPage = options.rowsPerPage || 10;

    this.currentPage = 1;
    this.columnsToDisplay = {};

    // Initialize table
    this.init();
  }

  async init() {
    // Create a new instance of FetchData
    this.fetchApi = new FetchData(this.url, this.hasPagination);

    // Render table elements
    this.renderElements();
    // Fetch data
    await this.getData();
    // Render table
    this.renderTable();
  }

  renderTable() {
    this.header = new Header(this, this.options);
    this.header.renderHeaders(this.uniqueColumnValues);
    this.body = new Body(this, this.options);
    this.body.renderBody();
  }

  /**
   * Fetches data from the specified URL and renders the table.
   */
  async getData() {
    try {
      const data = await this.fetchApi.fetch({
        page: this.currentPage,
        limit: this.rowsPerPage,
      });
      this.data = {
        results: data.results || [],
        totalResults: data.totalResults || 0,
      };

      // Extract headers from data.results and set this.tableInstance.headers
      if (this.data.results.length > 0) {
        this.headers = Object.keys(this.data.results[0]);
      } else {
        this.headers = [];
      }

      // Get unique column values
      this.uniqueColumnValues = this.getUniqueColumnValues(
        this.data.results,
        this.headers
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  /**
   * Creates a map of unique values for each column from the provided data.
   * @param {Array} results - The data results array.
   * @param {Array} headers - The headers array.
   * @returns {Object} An object containing unique values for each column.
   */
  getUniqueColumnValues(results, headers) {
    const uniqueColumnValues = {};
    results.forEach((row) => {
      headers.forEach((header) => {
        if (!uniqueColumnValues[header]) {
          uniqueColumnValues[header] = new Set();
        }
        uniqueColumnValues[header].add(row[header]);
      });
    });

    // Convert sets to arrays if needed
    Object.keys(uniqueColumnValues).forEach((header) => {
      uniqueColumnValues[header] = Array.from(uniqueColumnValues[header]);
    });

    return uniqueColumnValues;
  }
}

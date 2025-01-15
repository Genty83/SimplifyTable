
// Css Import 
//import '../../static/styles/simplify.css';

// Imports
import { TableRenderer } from '../components/tableRenderer.js';

/**
 * SimplifyTable class for creating and managing a dynamic, interactive table.
 *
 * @param {Object} options - Configuration options for the table.
 * @param {string} options.containerId - The id of the HTML element to contain the table.
 * @param {string} options.tableId - A unique identifier for the table.
 * @param {string} options.url - The URL to fetch data from.
 * @param {boolean} options.hasTableOptions - Flag to indicate if table options are enabled.
 * @param {boolean} options.hasPagination - Flag to indicate if pagination is enabled.
 * @param {boolean} options.hasSearch - Flag to indicate if search functionality is enabled.
 * @param {boolean} options.editableCells - Flag to indicate if cells are editable.
 * @param {string} options.themePath - The path to the theme json file for the table.
 */
export class SimplifyTable extends TableRenderer {
  constructor(options = {}) {
    super(options);
    // Set default options
    this.containerId = options.containerId || 'simplify-table';
    this.tableId = options.tableId || 'table-id';
    this.url = options.url || 'default-url';
    this.hasTableOptions = options.hasTableOptions || false;
    this.hasPagination = options.hasPagination || false;
    this.hasSearch = options.hasSearch || false;
    this.editableCells = options.editableCells || false;
    this.themePath = options.themePath || 'defaultLight.json';

    // Initialize table
    this.init();

  }

  async init() {
    // Render table elements
    this.renderElements();
  }
}

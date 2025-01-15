/**
 * @module fetchApi.js
 *
 * This module provides functionality to fetch, parse, and cache data from various sources (e.g., JSON and CSV).
 * The main class, FetchData, orchestrates the data fetching process using helper classes for network requests,
 * response parsing, and caching. The module follows the Single Responsibility Principle for maintainability and scalability.
 *
 * Example usage:
 *
 * import { FetchData } from './FetchDataModule';
 *
 * const fetchData = new FetchData('https://api.example.com/data', true);
 * fetchData.fetch({ page: 1, limit: 10, search: 'example' })
 *   .then((data) => console.log(data))
 *   .catch((error) => console.error(error));
 */

class NetworkFetcher {
  /**
   * Fetches data from a given URL.
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<Response>} A promise that resolves to the fetch response.
   * @throws {Error} If the fetch request fails.
   */
  async fetch(url) {
    console.log(`Fetching data from URL: ${url}`);  // Log the URL being fetched
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  }
}

class ResponseParser {
  /**
   * Parses the fetch response based on the content type.
   * @param {Response} response - The fetch response.
   * @returns {Promise<Object>} A promise that resolves to the parsed data.
   * @throws {Error} If the content type is unsupported.
   */
  async parse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType.includes("application/json")) {
      return response.json();
    } else if (contentType.includes("text/csv")) {
      const text = await response.text();
      return this.csvToJson(text);
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
  }

  /**
   * Converts CSV data to JSON format.
   * @param {string} csv - The CSV data as a string.
   * @returns {Object} The parsed JSON data.
   */
  csvToJson(csv) {
    const lines = csv.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const data = lines.slice(1).reduce((acc, line) => {
      if (!line.trim()) {
        return acc;
      }
      const values = line
        .match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
        .map((value) => value.trim().replace(/^"(.*)"$/, "$1"));
      while (values.length < headers.length) {
        values.push("-");
      }
      const entry = headers.reduce((obj, header, index) => {
        obj[header] = values[index] || "-";
        return obj;
      }, {});
      acc.push(entry);
      return acc;
    }, []);
    return { results: data };
  }
}

class DataCache {
  /**
   * Creates an instance of DataCache. Implements a singleton pattern.
   */
  constructor() {
    if (!DataCache.instance) {
      this.cache = {};
      DataCache.instance = this;
    }
    return DataCache.instance;
  }

  /**
   * Retrieves cached data for a given URL.
   * @param {string} url - The URL of the cached data.
   * @returns {Object|undefined} The cached data or undefined if not found.
   */
  get(url) {
    return this.cache[url];
  }

  /**
   * Caches data for a given URL.
   * @param {string} url - The URL to cache data for.
   * @param {Object} data - The data to cache.
   */
  set(url, data) {
    this.cache[url] = data;
  }
}

export class FetchData {
  /**
   * Creates an instance of FetchData.
   * @param {string|Object} url - The URL to fetch data from or a static data object.
   * @param {boolean} hasPagination - Indicates if pagination is enabled.
   */
  constructor(url, hasPagination = false) {
    this.url = url;
    this.hasPagination = hasPagination;
    this.fetcher = new NetworkFetcher();
    this.parser = new ResponseParser();
    this.cache = new DataCache();
  }

  /**
   * Fetches data based on the provided parameters.
   * @param {Object} params - The parameters for filtering and pagination.
   * @returns {Promise<Object>} A promise that resolves to the fetched and filtered data.
   * @throws {Error} If fetching data fails.
   */
  async fetch(params = {}) {
    if (typeof this.url === "object") {
      return this.filterStaticData(this.url, params);
    }

    const cachedData = this.cache.get(this.url);
    if (cachedData) {
      return this.filterStaticData(cachedData, params);
    }

    try {
      console.log(`Fetching data from URL: ${this.url}`);  // Log the URL being fetched
      const response = await this.fetcher.fetch(this.url);
      const data = await this.parser.parse(response);
      this.cache.set(this.url, data);
      return this.filterStaticData(data, params);
    } catch (error) {
      console.error(`Error fetching data from ${this.url}:`, error);
      throw new Error(`Error fetching data from ${this.url}: ${error.message}`);
    }
  }

  /**
   * Filters static data based on the provided parameters.
   * @param {Object} data - The static data to filter.
   * @param {Object} params - The parameters for filtering and pagination.
   * @returns {Object} The filtered and optionally paginated data.
   */
  filterStaticData(data, params) {
    let results = Array.isArray(data.results) ? data.results : data;

    Object.keys(params).forEach((key) => {
      if (key !== "page" && key !== "limit") {
        const value = String(params[key]).toLowerCase();
        results = results.filter((item) =>
          String(item[key]).toLowerCase().includes(value)
        );
      }
    });

    const totalResults = results.length;

    if (this.hasPagination) {
      const page = params.page ? parseInt(params.page) : 1;
      const limit = params.limit ? parseInt(params.limit) : 10;
      const start = (page - 1) * limit;
      const end = page * limit;
      const paginatedResults = results.slice(start, end);

      return { results: paginatedResults, totalResults };
    }

    return { results, totalResults };
  }
}


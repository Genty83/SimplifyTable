// fetchData.js

import { NetworkFetcher, ResponseParser } from './apiFetcher.js';
import { StaticDataFetcher } from './staticDataFetcher.js';

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
      return StaticDataFetcher.filterStaticData(this.url, params);
    }

    const cachedData = this.cache.get(this.url);
    if (cachedData) {
      return StaticDataFetcher.filterStaticData(cachedData, params);
    }

    try {
      console.log(`Fetching data from URL: ${this.url}`);  // Log the URL being fetched
      const response = await this.fetcher.fetch(this.url);
      const data = await this.parser.parse(response);
      this.cache.set(this.url, data);
      return StaticDataFetcher.filterStaticData(data, params);
    } catch (error) {
      console.error(`Error fetching data from ${this.url}:`, error);
      throw new Error(`Error fetching data from ${this.url}: ${error.message}`);
    }
  }
}
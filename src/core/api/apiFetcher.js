// apiFetcher.js

import { CsvFetcher } from './csvFetcher.js';

export class NetworkFetcher {
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

export class ResponseParser {
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
      return CsvFetcher.csvToJson(text);
    } else {
      throw new Error(`Unsupported content type: ${contentType}`);
    }
  }
}



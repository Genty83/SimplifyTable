/**
 * CsvFetcher Module
 *
 * Overview:
 * This module provides functionality for fetching a CSV file from a given URL and converting it into a structured JSON format. 
 * It includes the `CsvFetcher` class, which handles the fetching and conversion process. 
 * The main features of this module are its ability to handle HTTP errors, parse CSV data into a JSON structure, and trim spaces from headers and values.
 *
 * Features:
 * - Fetch CSV data from a specified URL.
 * - Handle HTTP errors gracefully.
 * - Convert CSV data into a structured JSON format.
 * - Trim spaces from headers and values for cleaner data.
 *
 * Classes:
 * - CsvFetcher: Handles fetching and converting CSV data into JSON format.
 *
 * Usage:
 * To use this module, create an instance of the `CsvFetcher` 
 * class by passing the URL of the CSV file. Then, call the `fetch` method to retrieve and parse the CSV data.
 *
 * Example:
 * const csvFetcher = new CsvFetcher('https://example.com/data.csv');
 * csvFetcher.fetch().then(data => console.log(data)).catch(error => console.error(error));
 */

/**
 * CsvFetcher class for fetching and converting CSV data.
 */
export default class CsvFetcher {
  /**
   * Constructor for the CsvFetcher class.
   * @param {string} url - The URL of the CSV file to fetch.
   */
  constructor(url) {
    this.url = url;
    this.headers = [];
  }

  /**
   * Fetch the CSV data from the specified URL and convert it to JSON.
   * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the CSV data.
   * @throws {Error} - Throws an error if the HTTP request fails.
   */
  async fetch() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      return this.csvToJsonStructured(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Error fetching CSV data");
    }
  }

  /**
   * Convert CSV data to a structured JSON format.
   * @param {string} data - The CSV data as a string.
   * @returns {Array<Object>} - An array of objects representing the CSV data.
   */
  csvToJsonStructured(data) {
    const rows = data.split("\n").filter((row) => row.trim() !== "");
    const headers = rows
      .shift()
      .split(",")
      .map((header) => header.trim()); // Get headers and trim spaces
    const results = rows.map((row) => {
      const values = row.split(",").map((value) => value.trim());
      return headers.reduce((acc, header, index) => {
        if (header) {
          // Only add if the header is not empty
          acc[header] = values[index] || "";
        }
        return acc;
      }, {});
    });
    this.headers = headers;
    return results;
  }
}

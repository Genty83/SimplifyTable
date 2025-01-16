// csvFetcher.js

export class CsvFetcher {
  /**
   * Converts CSV data to JSON format.
   * @param {string} csv - The CSV data as a string.
   * @returns {Object} The parsed JSON data.
   */
  static csvToJson(csv) {
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

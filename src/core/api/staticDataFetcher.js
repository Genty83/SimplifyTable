// staticDataFetcher.js

export class StaticDataFetcher {
  /**
   * Filters static data based on the provided parameters.
   * @param {Object} data - The static data to filter.
   * @param {Object} params - The parameters for filtering and pagination.
   * @returns {Object} The filtered and optionally paginated data.
   */
  static filterStaticData(data, params) {
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

    if (params.page || params.limit) {
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

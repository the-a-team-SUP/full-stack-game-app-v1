/**
 * This class contains
 */
class ObjectHelper {
  /**
   * change array object.
   * @param {string} stringifyArray the array with stringify objects.
   * @returns {object} this will return array with parse objects.
   */
  static toParseObject(stringifyArray) {
    return stringifyArray.map((data) => JSON.parse(data));
  }

  /**
   * change array object.
   * @param {string} parseArray the array with stringify objects.
   * @returns {object} this will return array with parse objects.
   */
  static toStringifyObject(parseArray) {
    return parseArray.map((data) => JSON.stringify(data));
  }
}

export default ObjectHelper;

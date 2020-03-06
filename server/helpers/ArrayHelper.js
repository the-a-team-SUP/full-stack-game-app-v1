/**
 * This class contains
 */
class ArrayHelper {
  /**
   * data.
   * @param {string} array The value.
   * @returns {string} The data.
  */
  static randomArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array.slice(0, 5);
  }
}

export default ArrayHelper;

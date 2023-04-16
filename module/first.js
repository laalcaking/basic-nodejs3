module.exports.removeDuplicates = function removeDuplicates(strings) {

    const arr = strings.split(',');
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      let cleanedString = '';
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== arr[i][j + 1]) {
          cleanedString += arr[i][j];
        }
      }
      result.push(cleanedString);
    }
    return result.toString("utf8");
}

  
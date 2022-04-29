const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if(!Array.isArray(arr)){
    throw new Error ("'arr' parameter must be an instance of the Array!")
  }
  const operations = {
    "--double-next": function (index, arrInnitial) {
      const nextItem = arr[index + 1];
      if (nextItem) {
        arrInnitial.push(nextItem);
      }
      return arrInnitial;
    },
    "--double-prev": function (index, arrInnitial) {
      const prevItem = arr[index - 1];
      if (prevItem) {
        arrInnitial.push(prevItem);
      }
      return arrInnitial;
    },
    "--discard-prev": function (index, arrInnitial) {
      return arrInnitial.slice(0, -1);
    },
    "--discard-next": function (index, arrInnitial) {
      return arrInnitial;
    }
  };
  
  let newArr = [];
  let x = 0;
  const availableOperations = Object.keys(operations);
  
  for (let i = 0; i < arr.length; i++) {
    if (availableOperations.includes(arr[i])) {
      newArr = operations[arr[i]](i, newArr);
      x = newArr.length;
      if(arr[i] === "--discard-next" ) {
        i++
        if(arr[i+1] === '--double-prev' || arr[i+1] === '--discard-prev') {
          i++
        }
      }
    } else {
      newArr[x] = arr[i];
      x++;
    }
  }
  return newArr
  // throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
}

module.exports = {
  transform
};

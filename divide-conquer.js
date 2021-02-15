// [1, 1] = 1 + 1
// [1] = 1
// [] = 0

const sum = (arr) => {
  if (arr.length === 0) {
    return 0
  }

  if (arr.length === 1) {
    return arr[0]
  }

  const [first, ...rest] = arr

  return first + sum(rest)
}

const countItems = (arr, count = 0) => {
  if (arr.length === 0) {
    return count
  }

  return countItems(arr.slice(1, arr.length), count + 1)
}

// [] = 0

// const countItemsAlternative = (arr) => {
//   if (arr.length === 0) {
//     return 0
//   }
//
//   return 1 + countItemsAlternative(arr.slice(1, arr.length))
// }

const max = (arr) => arr.sort((a, b) => b - a)[0]

// [1] = 1
// [1, 2] = 2

const maxRecursive = (arr) => {
  if (arr.length === 1) {
    return arr[0]
  }

  const [first, ...rest] = arr

  return Math.max(first, maxRecursive(rest))
}

console.log(maxRecursive([1, 2, 3, 4]))

// [1, 1] = 1 + 1
// [1] = 1
// [] = 0

// 4.1

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

// 4.2

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

// 4.3

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

// 4.4

// todo: finalize
const binarySearch = (arr, searchValue) => {
  if (arr.length === 1) {
    return arr[0]
  }

  const startPointer = 0
  const endPointer = Math.floor(arr.length / 2)

  return binarySearch(arr.slice(startPointer, endPointer))
}

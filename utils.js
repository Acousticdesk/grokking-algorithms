const pickKey = object => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return key
    }
  }
}

const noop = () => {}

module.exports = {
  pickKey,
  noop,
}

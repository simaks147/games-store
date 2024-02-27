const debounce = (func, time) => {
  let timer;

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, time)
  }
}

export default debounce
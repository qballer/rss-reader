// used to defer dispatch events functions.

export function deferFunction (func, args) {
  return function () {
    setTimeout(() => func(args), 0)
  }
}

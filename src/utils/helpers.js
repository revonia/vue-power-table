const isArray = Array.isArray

export const emptyArr = () => []

export function stringNormalize (string) {
  if (typeof string === 'string') {
    return string
  }
  if (string === null) {
    return ''
  }
  if (typeof string === 'undefined') {
    return ''
  }
  return JSON.stringify(string)
}

export function has (obj, propName) {
  if (obj === null || typeof obj === 'undefined') {
    return false
  }
  return obj.hasOwnProperty(propName)
}

export function get (obj, propName) {
  if (has(obj, propName)) {
    return obj[propName]
  }
  return undefined
}

export function onlyValidColumn (field) {
  return typeof field === 'string' || (typeof field === 'object' && field !== null)
}

export function mergeClassObj (...args) {
  let ret = {}
  for (let i = 0; i < args.length; i++) {
    let c = args[i]
    if (!c) continue
    if (typeof c === 'string') {
      c = c.split(/\s+/)
    }
    if (isArray(c)) {
      for (let j = 0; j < c.length; j++) {
        ret[c[j]] = true
      }
    }
    if (typeof c === 'object') {
      for (let key in c) {
        ret[key] = c[key]
      }
    }
  }
  return ret
}

export function values (value, ...args) {
  if (typeof value === 'function') {
    return value(...args)
  }
  return value
}

let explodeOnCache = {}
function explodeOn (on) {
  if (!explodeOnCache[on]) {
    explodeOnCache[on] = on.match(/^([&!~]*)([a-z]+)-([a-z]+)/)
  }
  return explodeOnCache[on]
}

export function resolveListeners (component, listeners, ...args) {
  if (!listeners) {
    return {}
  }
  return Object.keys(listeners).reduce(function (o, on) {
    // [prefix]component-event
    const match = explodeOn(on)
    if (!match || match[2] !== component) {
      return o
    }
    o[match[1] + match[3]] = (e) => {
      listeners[on](e, ...args)
    }
    return o
  }, {})
}

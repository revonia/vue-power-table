const isArray = Array.isArray

function vfor (items, callback) {
  if (!items) {
    return []
  }
  if (isArray(items)) {
    return items.map(callback)
  } else {
    return Object.keys(items).map((key) => callback(items[key], key, items))
  }
}

function vif (cond, callback, elseCallback) {
  return cond ? callback() : (elseCallback ? elseCallback() : null)
}

export { vfor, vif }

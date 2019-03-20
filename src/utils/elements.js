const handler = {
  get (target, name) {
    const { _h: h, _comps: comps } = target
    if (name[0] === name[0].toUpperCase()) {
      // get component
      if (comps !== null && typeof comps === 'object' && comps[name]) {
        return (data, children) => h(comps[name], data, children)
      } else {
        // use html element as default
        return (data, children) => h(name.toLowerCase(), data, children)
      }
    } else {
      // get html element
      return (data, children) => h(name, data, children)
    }
  }
}

/**
 * return create element shortcut
 * @param createElement
 * @param {object} components
 * @returns {object}
 */
export default function (createElement, components) {
  return new Proxy({ _comps: components, _h: createElement }, handler)
}

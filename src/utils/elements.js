/**
 * return create element shortcut
 * @param createElement
 * @param {object} components
 * @returns {object}
 */
export default function (createElement, components) {
  function el (name) {
    return (data, children) => createElement(name, data, children)
  }

  function component (name, defaults) {
    if (components !== null && typeof components === 'object' && components[name]) {
      return el(components[name])
    }
    return el(defaults)
  }

  return {
    div: el('div'),
    span: el('span'),
    colgroup: el('colgroup'),
    col: el('col'),
    Table: component('Table', 'table'),
    TableR: component('TableR', 'tr'),
    TableD: component('TableD', 'td'),
    TableH: component('TableH', 'th'),
    TableHead: component('TableHead', 'thead'),
    TableBody: component('TableBody', 'tbody'),
    TableFoot: component('TableFoot', 'tfoot'),
    TableCaption: component('TableCaption', 'caption')
  }
}

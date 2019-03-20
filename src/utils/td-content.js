import { get, has, stringNormalize } from './helpers'

export default function tdContent (rowData, {
  field,
  type = null,
  component = null,
  rowDataAsProp = false
} = {}, {
  h, slots, scopedSlots, trackBy
}) {
  const column = arguments[1]
  const props = { rowData: rowData, rowIndex: get(rowData, trackBy), column }
  switch (type) {
    case 'component':
      const comp = component || field
      return h(comp, { props: rowDataAsProp ? rowData : props })
    case 'slot':
      if (has(scopedSlots, field)) {
        return scopedSlots[field](props)
      } else if (has(slots, field)) {
        return slots[field]
      } else {
        return ''
      }
  }
  return stringNormalize(rowData[field])
}

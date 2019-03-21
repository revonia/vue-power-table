import { get, has, stringNormalize } from './helpers'

export default function dynamicContent (rowData, column, {
  h, slots, scopedSlots, trackBy
}) {
  const {
    field,
    type = null,
    component = null,
    rowDataAsProp = false
  } = column

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

import tdContent from '../utils/td-content'
import { resolveListeners } from '../utils/helpers'

export default {
  functional: true,
  props: {
    rowData: {
      type: Object,
      default: () => {}
    },
    slots: {
      default: null
    },
    scopedSlots: {
      default: null
    },
    column: {
      type: Object,
      require: true
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    tableProps: {
      type: Object,
      default: () => {}
    }
  },
  render (h, { props: { rowData, emit, slots, scopedSlots, column, trackBy }, listeners }) {
    let data = {
      class: column.classes,
      on: resolveListeners('td', listeners, rowData, column, trackBy)
    }

    return h('td', data, [
      tdContent(rowData, column, { h, slots, scopedSlots, trackBy })
    ])
  }
}

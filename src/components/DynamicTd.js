import dynamicContent from '../utils/dynamic-content'
import { resolveListeners } from '../utils/helpers'
import TdMixin from '../mixins/TdMixin'

export default {
  functional: true,
  mixins: [TdMixin],
  render (h, { props: { rowData, emit, slots, scopedSlots, column, trackBy }, listeners }) {
    let data = {
      class: column.classes,
      on: resolveListeners('td', listeners, rowData, column.field, column[trackBy], column)
    }

    return h('td', data, [
      dynamicContent(rowData, column, { h, slots, scopedSlots, trackBy })
    ])
  }
}

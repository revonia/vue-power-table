import { emptyArr } from '../utils/helpers'

const TableMixin = {
  props: {
    classes: {
      type: Object,
      default: function () {
        return {
          table: {},
          thead: {},
          tbody: {},
          tfoot: {},
          caption: {},
          thInThead: {},
          tdInTbody: {},
          tdInTfoot: {},
          trInThead: {},
          trInTbody: {},
          trInTfoot: {}
        }
      }
    },
    tableColumns: {
      type: Array,
      default: emptyArr
    },
    tableData: {
      type: Array,
      default: emptyArr
    },
    caption: {
      type: String
    },
    tableFootData: {
      type: Array,
      default: emptyArr
    },
    trackBy: {
      type: [String, Function],
      default: 'id'
    },
    footTrackBy: {
      type: [String, Function],
      default: 'id'
    },
    showHead: {
      type: Boolean,
      default: true
    }
  }
}

export default TableMixin

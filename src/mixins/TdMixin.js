const TdMixin = {
  props: {
    rowData: {
      type: Object,
      default: () => {
      }
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
      type: [String, Function],
      default: 'id'
    },
    tableProps: {
      type: Object,
      default: () => {
      }
    },
    in: {
      type: String,
      default: 'tbody'
    }
  }
}

export default TdMixin

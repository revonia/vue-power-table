import elements from './utils/elements'
import { vfor, vif } from './utils/directives'
import { emptyArr, onlyValidColumn } from './utils/helpers'

export default function (componments) {
  return {
    functional: true,
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
            th: {},
            td: {}
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
        type: String,
        default: 'id'
      },
      emit: {
        type: Function,
        default: null
      }
    },
    render: function (h, { props: p, slots, scopedSlots, listeners }) {
      const {
        Table,
        Td,
        Tr,
        Th,
        Caption,
        Thead,
        Tbody,
        Tfoot
      } = elements(h, componments)

      const columns = p.tableColumns.filter(onlyValidColumn)
      const data = p.tableData
      const footData = p.tableFootData

      return Table({ class: p.classes.table }, [
        vif(p.caption, () => Caption(p.caption)),

        Thead({ class: p.classes.thead }, [Tr(
          vfor(columns, (column, key) => {
            return Th({ class: p.classes.th, key: key, props: column }, column.title)
          })
        )]),

        Tbody({ class: p.classes.tbody }, vfor(data, (row, key) => {
          return Tr({ class: p.classes.tr }, vfor(columns, (column, columnIndex) => {
            return Td({
              class: p.classes.td,
              key: key + '-' + column.field,
              props: {
                rowData: row,
                slots,
                scopedSlots,
                column,
                trackBy: p.trackBy
              },
              on: listeners
            })
          }))
        })),

        vif(p.tableFootData.length > 0, () => {
          return Tfoot({ class: p.classes.tfoot }, vfor(footData, (row, key) => {
            return Tr(vfor(columns, (column, columnIndex) => {
              return Td({
                class: p.classes.td,
                key: 'foot-' + key + '-' + column.field,
                props: {
                  rowData: row,
                  slots,
                  scopedSlots,
                  column,
                  trackBy: p.trackBy
                },
                on: listeners
              })
            }))
          }))
        })
      ])
    }
  }
}

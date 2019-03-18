import elements from './utils/elements'
import { vfor, vif } from './utils/directives'

const emptyArr = () => []

export default function (componments) {
  return {
    functional: true,
    props: {
      tableClass: {
        type: [String, Object, Array]
      },
      tableFields: {
        type: [Array],
        default: emptyArr
      },
      tableData: {
        type: [Array],
        default: emptyArr
      },
      caption: {
        type: String
      },
      tableFootData: {
        type: Array,
        default: emptyArr
      }
    },
    render: function (h, { props: p, children, slot, scopedSlots }) {
      const {
        Table,
        TableD,
        TableR,
        TableH,
        TableCaption,
        TableHead,
        TableBody,
        TableFoot
      } = elements(h, componments)

      const fields = p.tableFields
      const data = p.tableData
      const footData = p.tableFootData

      return Table({ class: p.tableClass }, [
        vif(p.caption, () => TableCaption(p.caption)),

        TableHead([TableR(
          vfor(fields, (field, key) => {
            return TableH({ key: key, props: field }, field.title)
          })
        )]),

        TableBody(vfor(data, (row, key) => {
          return TableR(vfor(fields, (field, fieldIndex) => {
            return TableD({
              key: key + '-' + field.name
            }, row[field.name])
          }))
        })),

        vif(p.tableFootData.length > 0, () => {
          return TableFoot(vfor(footData, (row, key) => {
            return TableR(vfor(fields, (field, fieldIndex) => {
              return TableD({
                key: 'foot-' + key + '-' + field.name
              }, row[field.name])
            }))
          }))
        })
      ])
    }
  }
}

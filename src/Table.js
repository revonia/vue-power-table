import elements from './utils/elements'
import { defaults, onlyValidColumn, track, foreach } from './utils/helpers'
import TableMixin from './mixins/TableMixin'

export default function (componments) {
  return {
    functional: true,
    mixins: [ TableMixin ],
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
      const { tableData: data, tableFootData: footData, classes, trackBy, footTrackBy } = p

      return Table({ class: classes.table }, [
        p.caption ? Caption(p.caption) : null,
        p.showHead ? Thead({ class: classes.thead }, [Tr({ class: classes.trInThead, props: { in: 'thead' } },
          foreach(columns, (column, key) => {
            return Th({ class: classes.thInThead, key: defaults(column.field, key), props: { column, in: 'thead' } }, column.title)
          })
        )]) : null,

        Tbody({ class: classes.tbody }, foreach(data, (rowData, key) => {
          const passProps = {
            rowData,
            slots,
            scopedSlots,
            trackBy,
            in: 'tbody',
            tableProps: p
          }
          const trackKey = track(p.trackBy, rowData, key)
          return Tr({ class: classes.trInTbody, key: trackKey, props: { in: 'tbody' } }, foreach(columns, (column) => {
            return Td({
              class: classes.tdInTbody,
              key: 'tbody-' + trackKey + '-' + column.field,
              props: { column, ...passProps },
              on: listeners
            }, rowData[column.field])
          }))
        })),

        (p.tableFootData.length > 0)
          ? Tfoot({ class: classes.tfoot }, foreach(footData, (rowData, key) => {
            const passProps = {
              rowData,
              slots,
              scopedSlots,
              trackBy: footTrackBy,
              in: 'tfoot',
              tableProps: p
            }

            const trackKey = track(p.trackBy, rowData, key)
            return Tr({ class: classes.trInTfoot, key: trackKey, props: { in: 'tfoot' } }, foreach(columns, (column) => {
              return Td({
                class: classes.tdInTfoot,
                key: 'tfoot-' + trackKey + '-' + column.field,
                props: { column, ...passProps },
                on: listeners
              }, rowData[column.field])
            }))
          }))
          : null
      ])
    }
  }
}

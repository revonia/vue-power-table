<template>
  <div id="app">
    <MyTable :tableFields="fields" :tableData="data" caption="asdasdasd" :tableFootData="foot"/>
  </div>
</template>

<script>
import Table from './Table'

const MyTable = Table()

export default {
  name: 'app',
  data: function () {
    return {
      fields: [
        { title: 'a', name: 'a' },
        { title: 'b', name: 'b' },
        { title: 'c', name: 'c' },
        { title: 'd', name: 'd' },
        { title: 'e', name: 'e' }
      ],
      data: [
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 },
        { a: 1, b: 2, c: 3, d: 4, e: 5 }
      ],
      foot: [
        { a: 'x', b: 'x', c: 'x', d: 'x', e: 'x' }
      ]
    }
  },
  components: {
    MyTable
  }
}
</script>

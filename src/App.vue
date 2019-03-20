<template>
  <div id="app">
    <MyTable :tableColumns="columns" :tableData="data" caption="asdasdasd" @td-click="onTdClick">
      <template slot="mySlot" slot-scope="row">
        <span :style="{ color: row.rowData.color }">slot {{ row.rowData.text }}</span>
      </template>
    </MyTable>
  </div>
</template>

<script>
import Table from './Table'
import Td from './components/DynamicTd'
import MyComponent from './components/MyComponent'

const MyTable = Table({
  Td
})

export default {
  name: 'app',
  data: function () {
    return {
      columns: [
        { field: 'color', title: 'color' },
        { field: 'text', title: 'text' },
        { field: 'MyComponent', type: 'component', title: 'component field' },
        { field: 'mySlot', type: 'slot', title: 'slot field' }
      ],
      data: [
        { color: 'green', text: 'hello' },
        { color: 'yellow', text: 'yes' }
      ]
    }
  },
  components: {
    MyTable,
    MyComponent
  },
  methods: {
    onTdClick: function () {
      console.log(arguments)
    }
  }
}
</script>

<style>
  table {
    border-collapse: collapse;
  }

  table, th, td {
    border: 1px solid black;
  }
</style>

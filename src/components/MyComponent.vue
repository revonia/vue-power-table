<template>
  <span :style="{ color: rowData.color }">{{ rowData.text }}</span>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    rowData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>

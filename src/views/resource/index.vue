<template>
  <!-- 资源管理组件 -->
  <div class="resource">
    <ResourceList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/ResourceList.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceList
  }
})
</script>

<style lang="scss" scoped>
</style>

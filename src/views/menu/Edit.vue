<template>
  <div>
    <CreateOrEdit title="编辑菜单" :menuId="menuId"/>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit.vue'
export default {
  name: 'EditMenu',
  props: ['menuId'],
  components: {
    CreateOrEdit
  }
}
</script>

<style>

</style>
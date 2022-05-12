<template>
  <!-- 角色管理组件 -->
  <div class="role">
    <RoleList/>
  </div>
</template>

<script>
import RoleList from './components/RoleList.vue'
export default {
  name: 'RoleIndex',
  components: {
    RoleList
  }
}
</script>

<style>

</style>
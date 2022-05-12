<template>
  <!-- 用户管理组件 -->
  <div class="user">
    <UserList/>
  </div>
</template>

<script>
import UserList from './components/UserList.vue'
export default {
  name: 'UserIndex',
  components: {
    UserList
  }
}
</script>

<style>

</style>
<template>
  <!-- 侧边栏部分部分 -->
  <div class="aside">
    <!-- 导航栏组件 -->
    <el-menu
      :default-active="currentIndex"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
      <!-- 各菜单对应的导航 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-user"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-s-order"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-menu"></i>
          <span slot="title">资源管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-s-data"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user-solid"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advert-space">
          <i class="el-icon-data-board"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {

    }
  },
  computed: {
    // 根据所在的路由更新激活的导航
    currentIndex () {
      const index = this.$route.path.split('/')[1]
      return '/' + (index === '' ? 'course' : index)
    }
  }
}
</script>

<style scoped>
  .el-menu {
    background-color: #f8f9fb;
    min-height: 100vh;
    min-width: 200px;
  }
</style>
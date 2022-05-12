<template>
  <!-- 整体布局组件 -->
  <div class="layout">
    <!-- 布局容器组件 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <AppAside/>
      </el-aside>
      <el-container>
        <!-- 头部栏 -->
        <el-header style="text-align: right; font-size: 12px">
          <AppHeader/>
        </el-header>
        <!-- 主要页面 -->
        <el-main style="height: 500px; border: 1px solid #eee">
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #ffffff;
  }

  .el-container {
    /* 限定最小高度 vh 占整个页面的百分比 */
    min-height: 100vh;
    /* 限定最小宽度 小于该宽度自动添加滚动条 */
    /* min-width: 980px */
  }

  .el-aside::-webkit-scrollbar {
    display: none;
  }
</style>
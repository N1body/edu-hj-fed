<template>
  <!-- 头部栏部分 -->
  <div class="header">
    <!-- 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- 通过获取meta属性中的title来获取现在所在的导航 -->
      <el-breadcrumb-item>{{routeRecord}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头像下拉部分 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar :src="userInfo.portrait ||  require('../../assets/default-avatar.png')"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="phone">{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item divided command="exit">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUerInfo } from "@/services/user"
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  methods: {
    // 退出登录功能
    handleCommand(command) {
      if (command === 'exit') {
        this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          // 清楚用户的登录状态
          this.$store.commit('setUser', null)

          // 跳转到登录页面
          this.$router.push({
            name: 'login'
          })

          this.$message({ // 确认执行这里
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {
          this.$message({ // 取消执行这里
            type: 'info',
            message: '已取消退出'
          })
        })
      }
    },
    // 加载用户信息
    async loadUserInfo () {
      const { data } = await getUerInfo()
      if (data.state !== 1) {
        this.$message.error(data.message)
      }
      else {
        this.userInfo = data.content
      }
    }
  },
  computed: {
    routeRecord () {
      return this.$route.matched[1].meta.title
    }
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .header {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-dropdown {
    display: flex;
    align-items: center;
  }
</style>
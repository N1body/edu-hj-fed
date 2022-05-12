<template>
  <!-- 角色列表组件 -->
  <div class="role-list">
    <!-- 搜索表单栏 -->
    <el-form :inline="true" :model="pages" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="pages.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="isLoading" class="search">查询</el-button>
        <el-button  @click="clear" :disabled="isLoading">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 角色列表栏 -->
    <el-card>
      <div slot="header">
        <el-button @click="showDialog" :disabled="isLoading">添加角色</el-button>
      </div>
      <!-- 角色表格内容 -->
      <el-table
      :data="roles"
      border
      style="width: 100%"
      v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          label="编号"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                @click="$router.push({
                  name: 'allocMenu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
                type="text"
                size="mini">分配菜单</el-button>
              <el-button
                @click="$router.push({
                  name: 'allocResource',
                  params: {
                    roleId: scope.row.id
                  }
                })"
                type="text"
                size="mini">分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                size="mini"
                @click="handleEdit(scope.row)"
                >编辑</el-button>
              <el-button
                type="text"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <CreateOrEdit :title="dialogTitle" @success="loadAllRoles"/>
  </div>
</template>

<script>
import { getRolePages, deleteRole } from '@/services/role'
import CreateOrEdit from './CreateOrEdit.vue'
export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      isLoading: false,
      dialogTitle: '',
      roles: [],
      pages: {
        name: null,
        current: 1
      }
    }
  },
  created () {
    this.loadAllRoles()
  },
  methods: {
    // 加载所有角色
    async loadAllRoles () {
      this.isLoading = true
      const { data } = await getRolePages(this.pages)
      this.roles = data.data.records
      this.roles.forEach( item => {
        item.createdTime = item.createdTime.split('.000')[0].replace('T', ' ')
      })
      this.isLoading = false
    },
    // 添加角色功能
    showDialog () {
      this.dialogTitle = '添加角色'
      this.$bus.$emit('showRoleDialog')
    },
    // 查询功能
    search () {
      this.pages.current = 1
      this.loadAllRoles()
    },
    // 重置功能
    clear () {
      this.pages.name = null
      this.pages.current = 1
      this.loadAllRoles()
    },
    handleEdit (item) {
      this.dialogTitle = '编辑角色'
      this.$bus.$emit('showRoleDialog', item)
    },
    handleDelete (item) {
      this.$confirm('是否要删除该角色', '删除提示', {
        type: 'warning'
      }).then(async () => {
        // 请求删除操作
        const { data } = await deleteRole(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllRoles() // 更新数据列表
        }
      }).catch(err => {
        console.log(err)
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style>

</style>
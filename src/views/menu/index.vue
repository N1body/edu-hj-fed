<template>
  <div class="menu">
    <el-card>
      <div slot="header">
        <el-button 
          @click="$router.push({
            name: 'createMenu'
          })"
          :disabled="isLoading">添加菜单</el-button>
      </div>
      <el-table
      :data="menus"
      border
      style="width: 100%">
        <el-table-column
          prop="date"
          label="编号"
          type="index"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus, deleteMenu } from "@/services/menu";
export default {
  name: 'MenuIndex',
  data () {
    return {
      isLoading: false,
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      this.isLoading = true
      const { data } = await getAllMenus()
      this.menus = data.data
      this.isLoading = false
    },
    handleEdit (item) {
      this.$router.push({
        name: 'editMenu',
        params: {
          menuId: item.id
        }
      })
    },
    handleDelete(item) {
      this.$confirm('是否删除该菜单', '删除提示', {
        type: 'warning'
      }).then(async () => { // 确认执行
        // 请求删除操作
        const { data } = await deleteMenu(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus() // 更新数据列表
        }
      }).catch(err => { // 取消执行这里
        console.log(err)
        this.$message.info('已取消删除')
      })
    }
  },
}
</script>

<style>

</style>
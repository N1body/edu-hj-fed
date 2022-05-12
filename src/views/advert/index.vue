<template>
  <!-- 广告列表组件 -->
  <!-- 由于接口有问题,所以只做了各基本框架 -->
  <div class="menu">
    <el-card>
      <div slot="header">
        <el-button :disabled="isLoading">添加广告</el-button>
      </div>
      <el-table
      :data="menus"
      border
      style="width: 100%">
        <el-table-column
          prop="date"
          label="id"
          type="index"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="position"
          label="广告位置"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="广告图片"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="上线/下线"
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
export default {
  name: 'AdvertIndex',
  data () {
    return {
      isLoading: false,
      menus: []
    }
  },
  created () {
    this.$message.info('此功能待开发')
  },
  methods: {
    handleEdit (item) {
      console.log(item)
    },
    handleDelete(item) {
      console.log(item)
    }
  },
}
</script>

<style>

</style>
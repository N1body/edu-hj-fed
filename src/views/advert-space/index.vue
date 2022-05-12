<template>
  <!-- 广告位列表组件 -->
  <!-- 由于接口有问题,所以只做了各基本框架 -->
  <div class="menu">
    <el-card>
      <div slot="header">
        <el-button :disabled="isLoading">添加广告位</el-button>
      </div>
      <el-table
      :data="menus"
      border
      style="width: 100%">
        <el-table-column
          prop="key"
          label="spaceKey"
          type="index"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告位名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
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
  name: 'AdvertSpaceIndex',
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
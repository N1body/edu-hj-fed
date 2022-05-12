<template>
  <!-- 资源分类组件 -->
  <div class="category">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="addCategory">添加分类</el-button>
      </div>
      <el-table
      :data="resources"
      border
      style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          type="index"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="分类名称"
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
          prop="sort"
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

    <el-dialog :title="isEdit ? '编辑分类' : '添加分类'" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllCategory, createOrUpdateCategory, deleteCategory } from '@/services/resource'

export default Vue.extend({
  name: 'CategoryIndex',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        sort: 0
      },
      formLabelWidth: '110px',
      resources: [],
      isEdit: false
    }
  },
  created () {
    this.getAllCategory()
  },
  methods: {
    addCategory () {
      this.isEdit = false
      this.form = {
        name: '',
        sort: 0
      }
      this.dialogFormVisible = true
    },
    async getAllCategory () {
      const { data } = await getAllCategory()
      console.log(data)
      if (data.code === '000000') {
        this.resources = data.data
        this.resources.forEach(item => {
          item.createdTime = item.createdTime.split('.000')[0].replace('T', ' ')
        })
      }
    },
    async onSubmit () {
      // 表单验证
      // 验证通过，提交表单
      const { data } = await createOrUpdateCategory(this.form)
      if (data.code === '000000') {
        this.$message.success('添加分类成功')
        this.getAllCategory()
      } else {
        this.$message.error('添加分类失败')
      }
      this.dialogFormVisible = false
    },
    handleEdit (item) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.form = item
    },
    handleDelete (item) {
      this.$confirm('是否要删除该分类', '删除提示', {
        type: 'warning'
      }).then(async () => { // 确认执行
        // 请求删除操作
        const { data } = await deleteCategory(item.id)
        if (data.code === '000000') {
          this.$message.success('删除分类成功')
          this.getAllCategory() // 更新数据列表
        }
      }).catch(err => { // 取消执行这里
        console.log(err)
        this.$message.info('已取消删除')
      })
    }
  }
})
</script>

<style scoped>
.el-form-item {
  width: 300px;
}
.el-input-number{
  width: 100%;
}
</style>

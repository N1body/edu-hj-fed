<template>
  <div>
    <el-form :inline="true" :model="pages" class="demo-form-inline">
      <el-form-item label="资源名称">
        <el-input v-model="pages.name" placeholder="资源名称"></el-input>
      </el-form-item>
      <el-form-item label="资源路径">
        <el-input v-model="pages.url" placeholder="资源路径"></el-input>
      </el-form-item>
      <el-form-item label="资源分类">
          <el-select v-model="pages.categoryId" placeholder="全部">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryList"
              :key="item.id"
              ></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="isLoading">查询</el-button>
        <el-button @click="clearData" :disabled="isLoading">重置</el-button>
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="addResource" :disabled="isLoading">添加资源</el-button>
        <el-button @click="$router.push({ name: 'resourceCategory'})" :disabled="isLoading">资源分类</el-button>
      </div>
      <el-table
      :data="resources"
      border
      style="width: 100%"
      v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          label="编号"
          type="index"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
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

    <el-dialog :title="isEdit ? '编辑资源' : '添加资源'" :visible.sync="dialogFormVisible" width="35%">
      <el-form :model="form" :label-width="formLabelWidth">
        <el-form-item label="资源名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类">
            <el-option :value="0" label="请选择资源分类"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in categoryList"
              :key="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.current"
      :page-sizes="[10, 15, 20]"
      :page-size.sync="pages.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { deleteResource, createOrUpdateSource, getCategoryInfo, getResourcePages } from '@/services/resource'
export default {
  name: 'ResourceList',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        url: '',
        categoryId: 0,
        description: ''
      },
      formLabelWidth: '110px',
      categoryList: [],
      resources: [],
      isEdit: false,
      pages: {
        id: null,
        name: null,
        startCreateTime: null,
        url: null,
        categoryId: null,
        endCreateTime: null,
        current: 1,
        size: 15
      },
      total: 0,
      formInline: {
        user: '',
        region: ''
      },
      isLoading: true // 加载状态
    }
  },
  created () {
    this.loadCategoryInfo()
    this.loadAllRsources()
  },
  methods: {
    handleSizeChange () {
      this.pages.current = 1
      this.loadAllRsources()
    },
    handleCurrentChange () {
      this.loadAllRsources()
    },
    addResource () {
      this.isEdit = false
      this.form = {
        name: '',
        url: '',
        categoryId: 0,
        description: ''
      }
      this.dialogFormVisible = true
    },
    search () {
      this.pages.current = 1
      this.loadAllRsources()
    },
    async loadAllRsources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.pages)
      if (data.code === '000000') {
        this.total = data.data.total
        this.resources = data.data.records
        this.resources.forEach(item => {
          item.createdTime = item.createdTime.split('.000')[0].replace('T', ' ')
        })
      }
      this.isLoading = false // 关闭加载中状态
    },
    async loadCategoryInfo () {
      const { data } = await getCategoryInfo()
      if (data.code === '000000') {
        this.categoryList = data.data
      }
    },
    async onSubmit () {
      // 表单验证
      // 验证通过，提交表单
      const { data } = await createOrUpdateSource(this.form)
      if (data.code === '000000') {
        this.$message.success('添加资源成功')
        this.loadAllRsources()
      } else {
        this.$message.error('添加资源失败')
      }
      this.dialogFormVisible = false
    },
    handleEdit (item) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.form = item
    },
    handleDelete (item) {
      this.$confirm('是否要删除该资源', '删除提示', {
        type: 'warning'
      }).then(async () => { // 确认执行
        // 请求删除操作
        const { data } = await deleteResource(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllRsources() // 更新数据列表
        }
      }).catch(err => { // 取消执行这里
        console.log(err)
        this.$message.info('已取消删除')
      })
    },
    clearData () {
      this.pages.name = null
      this.pages.url = null
      this.pages.categoryId = null
      this.loadAllRsources()
    }
  }
}
</script>

<style scoped>
.el-dialog .el-form-item {
  width: 400px;
}
.el-dialog .el-select{
  width: 100%;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
  
</style>
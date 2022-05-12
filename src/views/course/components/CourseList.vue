<template>
  <!-- 课程列表组件 -->
  <div>
    <!-- 课程检索表单 -->
    <el-form :model="pages" :inline="true">
      <el-form-item label="课程名称">
        <el-input v-model="pages.courseName" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="pages.status" placeholder="全部">
          <el-option value="" label="全部"></el-option>
          <el-option label="下架" value="0"></el-option>
          <el-option label="上架" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="isLoading">查询</el-button>
        <el-button @click="clearData" :disabled="isLoading">重置</el-button>
      </el-form-item>
      <el-button
        class="add-btn"
        type="primary"
        :disabled="isLoading"
        @click="$router.push({
          name: 'addCourse'
        })"
      >添加课程
      </el-button>
    </el-form>
    <!-- 课程列表信息表格 -->
    <el-table
      :data="courses"
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column
          prop="id"
          label="ID"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="courseName"
          label="课程名称"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sortNum"
          label="排序"
          min-width="150"
          align="center">
        </el-table-column>
        <el-table-column
          label="上架状态"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="onStateChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button
              @click="$router.push({
                name: 'editCourse',
                params: {
                  courseId: scope.row.id
                }
              })"
              size="mini">编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'courseSection',
                params: {
                  courseId: scope.row.id
                }
              })"
              size="mini">内容管理</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size.sync="pages.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getAllCourse, changeState } from "@/services/course";
export default {
  name: 'CourseList',
  data () {
    return {
      // 加载标志 限制重复请求
      isLoading: false,
      // 页面检索数据
      pages: {
        currentPage: 1,
        pageSize: 15,
        courseName: null,
        status: null
      },
      // 总页数
      total: 0,
      // 课程列表信息
      courses: []
    }
  },
  created () {
    // 加载所有课程信息
    this.loadAllCourses()
  },
  methods: {
    // 加载所有课程信息
    async loadAllCourses () {
      this.isLoading = true
      const { data } = await getAllCourse(this.pages)
      if (data.code === '000000') {
        this.total = data.data.total
        this.courses = data.data.records
        this.courses.forEach(item => {
          item.price = '￥' + item.price
        })
      }
      this.isLoading = false
    },
    // 更改上下架信息
    async onStateChange (item) {
      this.isLoading = true
      const { data } = await changeState({
        courseId: item.id,
        status: item.status
      })
      if (data.code === '000000') {
        this.$message.success(`${item.status === 0 ? '下架' : '上架'}成功`)
      } else {
        this.$message.error(`${item.status === 0 ? '下架' : '上架'}失败`)
      }
      this.isLoading = false
    },
    search () {
      this.pages.currentPage = 1
      this.loadAllCourses()
    },
    clearData () {
      this.pages = {
        currentPage: 1,
        pageSize: 15,
        courseName: null,
        status: null
      }
      this.loadAllCourses()
    },
    handleSizeChange () {
      this.pages.currentPage = 1
      this.loadAllCourses()
    },
    handleCurrentChange () {
      this.loadAllCourses()
    }
  },
}
</script>

<style scoped>
.add-btn {
  float: right;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
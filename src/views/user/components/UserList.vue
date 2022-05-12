<template>
  <!-- 用户列表组件 -->
  <div class="user-list">
    <!-- 头部搜索表单 -->
    <el-form :inline="true" :model="pages" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="pages.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="pages.date"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="left">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" :disabled="isLoading" class="search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格内容 -->
    <el-table
    :data="users"
    v-loading="isLoading"
    style="width: 100%">
      <el-table-column
        prop="id"
        label="用户id"
        min-width="150"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        label="头像"
        min-width="150"
        align="center"
        width="180">
        <template slot-scope="scope">
          <el-avatar :size="50" :src="scope.row.portrait ? scope.row.portrait : portrait "></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        min-width="150"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        min-width="150"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="注册时间"
        min-width="150"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
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
            type="danger"
            @click="handleForbid(scope.row)">禁用</el-button>
          <el-button
            size="mini"
            @click="handleAlloc(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码切换 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size.sync="pages.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 分配角色弹出框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%">
      <el-select v-model="selectRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserPages, getAllRoles, getUserRole, allocateUserRoles } from '@/services/user';
export default {
  name: 'UserList',
  data () {
    return {
      dialogVisible: false,
      users: [],
      isLoading: false,
      portrait: 'http://www.lgstatic.com/thumbnail_100x100/i/image2/M01/5E/65/CgotOVszSAOANi0LAAAse2IVWAE693.jpg',
      selectRoleId: null,
      selectRoles: [],
      roles: [],
      pages: {
        phone: null,
        date: null,
        currentPage: 1,
        pageSize: 15,
        userId: 0,
        startCreateTime: null,
        endCreateTime: null
      },
      total: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.loadUserList()
    this.loadAllRoles()
  },
  methods: {
    async loadUserList () {
      this.isLoading = true
      const { data } = await getUserPages(this.pages)
      if (data.code === '000000') {
        this.total = data.data.total
        this.users = data.data.records
        this.users.forEach( item => {
          item.createTime = item.createTime.split('.000')[0].replace('T', ' ')
        })
      }
      this.isLoading = false
    },
    async loadAllRoles () {
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
    },
    async onSubmit () {
      const { data } = await allocateUserRoles({
        userId: this.selectRoleId,
        roleIdList: this.selectRoles
      })
      if (data.code === '000000') {
        this.$message.success('分配角色成功')
      } else {
        this.$message.error('分配角色失败')
      }
      this.dialogVisible = false
    },
    async handleForbid (item) {
      console.log(item)
    },
    handleSizeChange () {
      this.pages.currentPage = 1
      this.loadUserList()
    },
    handleCurrentChange () {
      this.loadUserList()
    },
    search () {
      this.pages.currentPage = 1
      this.pages.startCreateTime = this.pages.date ? this.pages.date[0] : null
      this.pages.endCreateTime = this.pages.date ? this.pages.date[1] : null
      this.loadUserList()
    },
    async handleAlloc (item) {
      this.selectRoleId = item.id
      const { data } = await getUserRole(item.id)
      if (data.code === '000000') {
        this.selectRoles = data.data.map(role => role.id)
      }
      this.dialogVisible = true
    }
  },
}
</script>

<style>
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.el-select {
  width: 90%;
}
</style>
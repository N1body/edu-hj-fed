<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="35%">
      <el-form :model="dialogForm" label-width="110px">
        <el-form-item label="角色名称">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="dialogForm.code"></el-input>
        </el-form-item>
        <el-form-item label="资源描述">
          <el-input type="textarea" v-model="dialogForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false" :disabled="isLoading">取 消</el-button>
        <el-button type="primary" @click="onSubmit"  :disabled="isLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createOrUpdate } from "@/services/role";
export default {
  name: 'CreateOrEdit',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogForm: {
        name: null,
        code: null,
        description: null
      },
      isLoading: false
    }
  },
  methods: {
    showDialog (data) {
      if (data) {
        this.dialogForm = data
      } else {
        this.dialogForm = {
          name: null,
          code: null,
          description: null
        }
      }
      this.dialogVisible = true
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await createOrUpdate(this.dialogForm)
      if (data.code === '000000') {
        this.$message.success('添加角色成功')
        this.$emit('success')
      } else {
        this.$message.error('添加资源失败')
      }
      this.dialogVisible = false
      this.isLoading = false
    }
  },
  mounted () {
    this.$bus.$on('showRoleDialog', this.showDialog)
  },
  beforeDestroy () {
    this.$bus.$off('showRoleDialog')
  }
}
</script>

<style scoped>
.el-form-item {
  width: 400px;
}
</style>
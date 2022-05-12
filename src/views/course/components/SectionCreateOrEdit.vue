<template>
  <!-- 课程章节添加或者更新组件 -->
  <el-dialog
    :title="isEdit ? '编辑课程阶段': '添加课程阶段'"
    :visible.sync="dialogVisible"
    width="45%"
  >
    <!-- 课程章节表单信息 -->
    <el-form label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="sectionForm.courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="sectionForm.sectionName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述">
        <el-input v-model="sectionForm.description"></el-input>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="sectionForm.orderNum"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button @click="onSubmit" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdateSection } from "@/services/course-section";
export default {
  name: 'SecitionCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      sectionForm: {
        courseId: '',
        courseName: '',
        sectionName: '',
        description: '',
        orderNum: 1
      }
    }
  },
  methods: {
    // 保存课程章节信息
    async onSubmit () {
      const { data } = await saveOrUpdateSection(this.sectionForm)
      console.log(data)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
      else {
        this.$message.error(data.mesg)
      }
      this.$bus.$emit('reloadInfo')
      this.dialogVisible = false
    }
  },
  watch: {
    dialogVisible (newValue) {
      if (!newValue) {
        this.sectionForm = {
          sectionName: '',
          description: '',
          orderName: 1
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
<template>
  <!-- 课程课时的添加或更新组件 -->
  <el-dialog
    :title="isEdit ? '添加课时阶段': '编辑课时阶段'"
    :visible.sync="dialogVisible"
    width="45%"
  >
    <!-- 课程课时表单信息 -->
    <el-form label-width="100px">
      <el-form-item label="课程名称">
        <el-input v-model="courseName" disabled></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="sectionName" disabled></el-input>
      </el-form-item>
      <el-form-item label="课时名称">
        <el-input v-model="lessonForm.theme"></el-input>
      </el-form-item>
      <el-form-item label="时长">
        <el-input 
          type="number"
          :min="0"
          v-model.number="lessonForm.duration">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="是否开放试听">
        <el-switch v-model="lessonForm.isFree"></el-switch>
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="lessonForm.orderNum">
        </el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button @click="onSubmit" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { saveOrUpdate } from "@/services/course-lesson";
export default {
  name: 'LessonCreateOrEdit',
  props: {
    // 更新或者编辑的标志
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      courseName: '',
      sectionName: '',
      lessonForm: {
        courseId: '',
        sectionId: '',
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 1
      }
    }
  },
  methods: {
    // 保存课程课时信息
    async onSubmit () {
      const { data } = await saveOrUpdate(this.lessonForm)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
      else {
        this.$message.error(data.mesg)
      }
      this.dialogVisible = false
    }
  },
  watch: {
    // 监听弹出框是否隐藏 如果隐藏则清除表单信息
    dialogVisible (newValue) {
      if (!newValue) {
        this.lessonForm = {
          courseId: '',
          sectionId: '',
          theme: '',
          duration: 0,
          isFree: false,
          orderNum: 1
        }
        this.$bus.$emit('reloadInfo')
      }
    }
  }
}
</script>

<style scoped>
</style>
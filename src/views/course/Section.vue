<template>
  <div>
    <!-- 阶段列表 -->
    <el-card>
      <div slot="header" class="card-header">
        {{courseTitle}}
        <el-button type="primary" @click="addSection">添加阶段</el-button>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        v-loading="isLoading"
        draggable
        :allow-drop="allowDrop"
        @node-drop="handleDrop"
      >
        <span class="inner" slot-scope="{ node, data }">
          <!-- 章节名或者课时名 -->
          <span>{{ node.label }}</span>
          <!-- 根据是否是课时名来修改对应的按钮 -->
          <span v-if="data.sectionName">
            <el-button
              @click.stop="EditSection(data)">
              编辑
            </el-button>
            <el-button
              type="primary"
              @click.stop="addLesson(data)">
              添加课时
            </el-button>
            <el-select
              v-model="data.status" 
              class="select-status"
              placeholder="请选择"
              @change="updateSectionStatus(data)">
              <el-option label="已隐藏" :value="0"/>
              <el-option label="待更新" :value="1"/>
              <el-option label="已更新" :value="2"/>
            </el-select>
          </span>
          <span v-else>
            <el-button
              @click.stop="editLesson(node, data)">
              编辑
            </el-button>
            <el-button
              type="success"
              @click="updateVideo">
              上传视频
            </el-button>
            <el-select
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="updateLessonStatus(data)">
              <el-option label="已隐藏" :value="0"/>
              <el-option label="待更新" :value="1"/>
              <el-option label="已更新" :value="2"/>
            </el-select>
          </span>
        </span>
      </el-tree>
    </el-card>
    
    <!-- 添加编辑阶段 -->
    <SecitionCreateOrEdit
      :isEdit="isSectionEdit"
      ref="sectionDialog"
      :sectionInfo="editSectionInfo"
      />

    <!-- 添加编辑课时 -->
    <LessonCreateOrEdit
      :isEdit="isLessonEdit"
      ref="lessonDialog"
    />
  </div>
</template>

<script>
import SecitionCreateOrEdit from './components/SectionCreateOrEdit.vue'
import LessonCreateOrEdit from './components/LessonCreateOrEdit.vue'
import { getCourseById } from "@/services/course"
import { getSectionAndLesson, saveOrUpdateSection } from "@/services/course-section"
import { saveOrUpdate } from "@/services/course-lesson"

export default {
  name: 'CourseSection',
  components: {
    SecitionCreateOrEdit,
    LessonCreateOrEdit
  },
  props: {
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    // 设置属性组件默认label和children属性
    const defaultProps = {
      children: 'lessonDTOS',
      label (data) {
        return data.sectionName || data.theme
      }
    }
    return {
      isLoading: false,
      courseTitle: '',
      sections: [],
      isSectionEdit: false,
      isLessonEdit: false,
      editSectionInfo: {},
      defaultProps
    }
  },
  created () {
    this.loadCourseInfo()
    this.loadSectionInfo()
  },
  methods: {
    // 加载课程信息
    async loadCourseInfo () {
      this.isLoading = true
      const { data } = await getCourseById(this.courseId)
      this.courseTitle = data.data.courseName
      this.isLoading = false
    },
    // 加载课程章节信息
    async loadSectionInfo () {
      this.isLoading = true
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
      this.isLoading = false
    },
    // 添加课程章节
    addSection () {
      this.isSectionEdit = false
      this.$refs['sectionDialog'].sectionForm.courseName = this.courseTitle
      this.$refs['sectionDialog'].sectionForm.courseId = this.courseId
      // 打开弹出框
      this.$refs['sectionDialog'].dialogVisible = true
    },
    // 编辑课程章节信息
    EditSection (data) {
      this.isSectionEdit = true
      // 将数据传给弹出框组件
      this.$refs['sectionDialog'].sectionForm = data
      this.$refs['sectionDialog'].sectionForm.courseName = this.courseTitle
      // 打开弹出框
      this.$refs['sectionDialog'].dialogVisible = true
    },
    // 添加课程课时信息
    addLesson (data) {
      this.isLessonEdit = false
      this.$refs['lessonDialog'].courseName = this.courseTitle
      this.$refs['lessonDialog'].sectionName = data.sectionName
      this.$refs['lessonDialog'].lessonForm.courseId = this.courseId
      this.$refs['lessonDialog'].lessonForm.sectionId = data.id
      // 打开弹出框
      this.$refs['lessonDialog'].dialogVisible = true
    },
    // 编辑课程课时信息
    editLesson (node, data) {
      this.isLessonEdit = true
      this.$refs['lessonDialog'].courseName = this.courseTitle
      this.$refs['lessonDialog'].sectionName = node.parent.data.sectionName
      this.$refs['lessonDialog'].lessonForm = data
      // 打开弹出框
      this.$refs['lessonDialog'].dialogVisible = true
    },
    // 更新Video信息
    updateVideo() {
      this.$message.info('此功能待开发')
    },
    // 重新加载章节信息
    reloadInfo () {
      this.loadCourseInfo()
      this.loadSectionInfo()
    },
    // 更新课程章节状态
    async updateSectionStatus(value) {
      const { data } = await saveOrUpdateSection(value)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
      else {
        this.$message.error(data.mesg)
      }
    },
    // 更新课程课时状态
    async updateLessonStatus(value) {
      const { data } = await saveOrUpdate(value)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
      }
      else {
        this.$message.error(data.mesg)
      }
    },
    // 判断是否允许拖拽进入
    allowDrop (draggingNode, dropNode, type) {
      if (type === 'inner' || draggingNode===dropNode) {
        return false
      }
      if (draggingNode.data.sectionName && !dropNode.data.sectionName) {
        return false
      }
      if (draggingNode.data.sectionName && !dropNode.data.sectionName) {
        return false
      }
      if (type === 'prev' && draggingNode.data.orderNum < dropNode.data.orderNum) {
        return false
      }
      if (type === 'next' && draggingNode.data.orderNum > dropNode.data.orderNum) {
        return false
      }
      return true
    },
    // 拖拽排序功能
    async handleDrop (draggingNode, dropNode) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          if (draggingNode.data.sectionName) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdate({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.$message.success('排序成功')
      } catch (err) {
        console.log(err)
        this.$message.error('排序失败')
      }
      this.reloadInfo()
    }
  },
  mounted () {
    this.$bus.$on('reloadInfo',this.reloadInfo)
  },
  beforeDestroy () {
    this.$bus.$off('reloadInfo')
  }
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inner {
  display: flex;
  flex: 1 0 0;
  align-items: center;
  padding: 9px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,.05);
}

::v-deep .el-tree-node__content {
  height: auto;
}

.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>
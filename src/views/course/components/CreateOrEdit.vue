<template>
  <!-- 课程的添加或者更新组件 -->
  <div>
    <el-card>
      <!-- 通过步骤条组件将表单信息切割 -->
      <div slot="header">
        <el-steps :active="activeStep" simple>
        <el-step 
          v-for="(item, index) in steps"
          :key="index"
          :title="item.title" 
          :icon="item.icon"
          @click.native="activeStep = index"></el-step>
      </el-steps>
      </div>
      <!-- 课程信息表单部分 -->
      <el-form label-width="80px">
        <!-- 基本信息表单 -->
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="course.teacherDTO.position"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input
              style="margin-bottom: 10px"
              v-model="course.previewFirstField"
              type="textarea"
              placeholder="概述1"
              ></el-input>
            <el-input
              v-model="course.previewSecondField"
              type="textarea"
              placeholder="概述2"
              ></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="course.sortNum"
              label="描述文字"></el-input-number>
          </el-form-item>
        </div>
        <!-- 课程封面表单 -->
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <CourseImage v-model="course.courseListImg"/>
          </el-form-item>
          <el-form-item label="解锁封面">
            <CourseImage v-model="course.courseImgUrl"/>
          </el-form-item>
        </div>
        <!-- 销售信息表单 -->
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input v-model="course.discounts">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="course.price">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="course.sales">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <!-- 秒杀活动表单 -->
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关" label-width="100px">
            <el-switch
              v-model="course.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="course.activityCourseDTO.beginTime"
                type="datetime"
                default-time="12:00:00"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="course.activityCourseDTO.endTime"
                type="datetime"
                default-time="12:00:00"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="course.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model="course.activityCourseDTO.stock">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <!-- 课程详情表单 -->
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <TextEditor v-model="course.courseDescriptionMarkDown"/>
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch
              v-model="course.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCourseById, saveOrUpdateCourse } from "@/services/course";
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
export default {
  name: 'CreateOrEdit',
  components: {
    CourseImage,
    TextEditor
  },
  props: {
    // 判断是添加课程还是编辑课程
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  data () {
    return {
      // 步骤数据
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-picture' },
        { title: '销售信息', icon: 'el-icon-sell' },
        { title: '秒杀活动', icon: 'el-icon-discount' },
        { title: '课程详情', icon: 'el-icon-info' }
      ],
      // 当前激活的步骤
      activeStep: 0,
      // 课程详细信息
      course: {
        courseName: '',
        brief: '',
        teacherDTO: {
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 1,
        sales: 0,
        activityCourse: false,
        activityCourseDTO: {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    // 加载课程信息
    async loadCourse () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.data
      if (!this.course.activityCourseDTO) {
        this.course.activityCourseDTO = {
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        }
      }
    },
    // 保存课程信息
    async handleSave () {
      const { data } = await saveOrUpdateCourse(this.course)
      if (data.code === '000000') {
        this.$message.success('添加课程成功')
      } else {
        this.$message.error('添加课程失败')
      }
      this.$router.back()
    },
  }
}
</script>

<style scoepd>
.el-step {
  cursor: pointer;
}
</style>
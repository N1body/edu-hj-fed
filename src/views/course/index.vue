<template>
  <!-- 课程管理首页 -->
  <div class="course">
    <CourseList/>
  </div>
</template>

<script>
import CourseList from './components/CourseList.vue'
export default {
  name: 'CourseIndex',
  components: {
    CourseList
  }
}
</script>

<style>

</style>
<template>
  <!-- 编辑课程组件 -->
  <div>
    <CreateOrEdit :isEdit="true" :courseId="courseId"/>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit.vue'
export default {
  name: 'EditCoure',
  props: ['courseId'],
  components: {
    CreateOrEdit
  }
}
</script>

<style>

</style>
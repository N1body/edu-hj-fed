<template>
  <div ref="editor"></div>
</template>

<script>
import E from 'wangeditor'
import { uploadCourseImage } from "@/services/course";
export default {
  name: 'TextEditor',
  // 绑定v-model中的值
  props: ['value'],
  mounted () {
    this.initEditor()
  },
  methods: {
    // 初始化 Editor
    initEditor () {
      // 将 editor 创建在对应元素上
      const editor = new E(this.$refs.editor)
      // 事件监听必须在 create 之后
      // 将值传回给父组件
      editor.config.onchange = value => {
        this.$emit('input', value);
      }
      // 配置 server 接口地址
      editor.config.uploadImgServer = '/upload-img'
      editor.create()
      // 设置初始值必须在 create 之后
      editor.txt.html(this.value)

      editor.config.customUploadImg = async function(resultFiles, insertImgFn) {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)

        insertImgFn(data.data.name)
      }
    },
  },
}
</script>

<style>

</style>
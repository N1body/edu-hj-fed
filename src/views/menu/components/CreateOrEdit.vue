<template>
  <div>
    <!-- 添加或编辑菜单组件 -->
    <el-card>
      <!-- 标题部分 -->
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <!-- 菜单信息表单部分 -->
      <el-form :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in parentMenuList"
              :key="item.id"
              ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="menuId" @click="clearData">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createOrUpdateMenu, getEditMenuInfo } from "@/services/menu";
export default {
  name: 'CreateOrEdit',
  props: {
    title: {
      type: String,
      required: true
    },
    menuId: {
      required: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      parentMenuList: [] // 父级菜单列表
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('保存成功')
        this.$router.back()
      }
    },
    async loadMenuInfo () {
      const { data } = await getEditMenuInfo(this.menuId || -1)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
      if (data.data.menuInfo) {
        this.form = data.data.menuInfo
      }
    },
    clearData () {
      this.form = {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      }
    }
  },
}
</script>

<style>

</style>
<template>
  <div>
    <el-card>
      <div slot="header">分配权限</div>
      <el-tree
      :data="menus"
      node-key="id"
      :props="defaultProps"
      :default-checked-keys="checkedKeys"
      ref="menu-tree"
      show-checkbox
      default-expand-all
      ></el-tree>
      <div style="text-align: center; margin-top: 30px">
        <el-button @click="resetChecked">清空</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'AllocMenu',
  props: ['roleId'],
  data () {
    return {
      menus: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.menus = data.data
      this.getCheckedKeys(this.menus)
    },
    getCheckedKeys (menus) {
      menus.forEach(menu => {
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        } else {
          if (menu.selected) {
            this.checkedKeys = [...this.checkedKeys, menu.id]
          }
        }
      })
    },
    async onSave () {
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      this.$refs['menu-tree'].setCheckedKeys([])
    }
  }
}
</script>

<style>

</style>
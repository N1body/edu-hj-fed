// 菜单请求相关模块
import request from "@/utils/request"

// 给角色分配菜单
export const allocateRoleMenus = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

// 获取角色菜单
export const getRoleMenus = roleId => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}

// 添加或更新菜单信息
export const createOrUpdateMenu = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 根据id获取菜单信息
export const getEditMenuInfo = id => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 获取所有菜单信息
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 根据id删除对应菜单
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
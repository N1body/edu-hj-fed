// 资源请求相关模块
import request from '@/utils/request'

// 根据角色 id 获取角色对应资源信息
export const getRoleResources = roleId => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

// 分配角色资源信息
export const allocateRoleResources = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

// 添加或者更新资源信息
export const createOrUpdateSource = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

// 获取资源分类信息
export const getCategoryInfo = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 获取所有资源信息
export const getAllResources = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// 根据 id 删除对应资源
export const deleteResource = id => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

// 获取所有分类信息
export const getAllCategory = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 添加或者更新分类信息
export const createOrUpdateCategory = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

// 根据 id 删除对应分类
export const deleteCategory = id => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}

// 根据页面信息获取资源列表
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

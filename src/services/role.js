// 角色信息请求模块
import request from '@/utils/request'

// 获取角色列表
export const getRolePages = data => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 根据 id 删除角色
export const deleteRole = id => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 更新角色列表信息
export const createOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

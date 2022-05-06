// 资源请求相关模块
import request from '@/utils/request'

export const getRoleResources = roleId => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

export const allocateRoleResources = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}

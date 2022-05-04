import request from '@/utils/request'
import qs from 'qs'

// 用户登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 获取登录用户信息
export const getUerInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 根据页码信息获取用户列表
export const getUserPages = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

// 获取所有角色信息
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 根据 id 获取已分配角色信息
export const getUserRole = id => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}

// 给用户分配角色信息
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
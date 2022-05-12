// 课程课时请求模块
import request from "@/utils/request"

// 添加或者更新课程课时信息
export const saveOrUpdate = data => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
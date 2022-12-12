import request from '@/request/request'
// 获取用户列表
export function getUser(page,limit,data)
{
  return request({
    url: `sysUser/${page}/${limit}`,
    method: 'get',
    params:data
  })
}

// 根据id删除用户
export function deleteUser(id)
{
  return request({
    url: `sysUser/remove/${id}`,
    method: 'delete'
  })
}

// 添加用户
export function addUser(data)
{
  return request({
    url: `sysUser/save`,
    method: 'post',
    data
  })
}

import request from '@/request/request'
// 获取你要的数据
export function getUser(page,limit,data)
{
  return request({
    url: `sysUser/${page}/${limit}`,//自己的接口地址
    method: 'get',//请求方法
    params:data
  })
}

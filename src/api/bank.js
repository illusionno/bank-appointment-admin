import request from '@/request/request'
// 银行管理
// 获取银行列表
export function getBank(page,limit,data)
{
  return request({
    url: `system/bank/${page}/${limit}`,
    method: 'get',
    params:data
  })
}

// 根据id删除银行
export function deleteBank(id)
{
  return request({
    url: `system/bank/remove/${id}`,
    method: 'delete'
  })
}

// 添加银行
export function addBank(data)
{
  return request({
    url: `system/bank/save`,
    method: 'post',
    data
  })
}

// 更新银行
export function updateBank(data)
{
  return request({
    url: `system/bank/update`,
    method: 'post',
    data
  })
}

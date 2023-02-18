import request from '@/request/request'
// 银行业务
// 获取业务列表
export function getService(page,limit,data)
{
  return request({
    url: `refundInfo/${page}/${limit}`,
    method: 'get',
    params:data
  })
}

// 所有银行列表
export function getAllBank(isTrue)
{
  return request({
    url: `system/bank/getAllBank/${isTrue}`,
    method: 'get',
  })
}

// 根据id删除业务
export function deleteService(id)
{
  return request({
    url: `refundInfo/remove/${id}`,
    method: 'delete'
  })
}

// 添加业务
export function addService(data)
{
  return request({
    url: `refundInfo/save`,
    method: 'post',
    data
  })
}

// 更新业务
export function updateService(data)
{
  return request({
    url: `refundInfo/update`,
    method: 'post',
    data
  })
}

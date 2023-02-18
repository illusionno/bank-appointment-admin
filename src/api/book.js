import request from '@/request/request'
// 预约管理
// 获取预约列表
export function getBook(page,limit,data)
{
  return request({
    url: `book/${page}/${limit}`,
    method: 'get',
    params:data
  })
}

// 根据id删除预约
export function deleteBook(id)
{
  return request({
    url: `book/remove/${id}`,
    method: 'delete'
  })
}

// 添加预约
export function addBook(data)
{
  return request({
    url: `book/save`,
    method: 'post',
    data
  })
}

// 更新预约
export function updateBook(data)
{
  return request({
    url: `book/update`,
    method: 'post',
    data
  })
}
// 根据银行名称查找预约
export function getRefundsByName(data)
{
  return request({
    url: `refundInfo/getAllRefunds`,
    method: 'post',
    data
  })
}

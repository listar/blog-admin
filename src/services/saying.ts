import request from '@/utils/request';



export async function sayingList(params: any) {
  return request('/api/saying/list', {
    method: 'POST',
    data: params,
  });
}

export async function sayingDetail(params: any) {
  return request('/api/saying/detail', {
    method: 'POST',
    data: params,
  });
}

export async function sayingDel(params: any) {
  return request('/api/saying/del', {
    method: 'POST',
    data: params,
  });
}

export async function sayingAction(params: any) {
  return request('/api/saying/action', {
    method: 'POST',
    data: params,
  });
}

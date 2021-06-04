import request from '@/utils/request';



export async function articleList(params: any) {
  return request('/api/article/list', {
    method: 'POST',
    data: params,
  });
}

export async function articleDetail(params: any) {
  return request('/api/article/detail', {
    method: 'POST',
    data: params,
  });
}

export async function articleDel(params: any) {
  return request('/api/article/del', {
    method: 'POST',
    data: params,
  });
}

export async function articleAction(params: any) {
  return request('/api/article/action', {
    method: 'POST',
    data: params,
  });
}

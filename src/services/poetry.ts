import request from '@/utils/request';



export async function poetryList(params: any) {
  return request('/api/poetry/list', {
    method: 'POST',
    data: params,
  });
}

export async function poetryDetail(params: any) {
  return request('/api/poetry/detail', {
    method: 'POST',
    data: params,
  });
}

export async function poetryDel(params: any) {
  return request('/api/poetry/del', {
    method: 'POST',
    data: params,
  });
}

export async function poetryAction(params: any) {
  return request('/api/poetry/action', {
    method: 'POST',
    data: params,
  });
}

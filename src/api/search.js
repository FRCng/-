import service from '@/utils/request';

export function GetSuggestion(q) {
  return service.request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q,
    },
  });
}
export function GetSearchResult(params) {
  return service.request({
    method: 'get',
    url: '/app/v1_0/search',
    params,
  });
}
export function GetHistory() {
  return service.request({
    method: 'get',
    url: '/app/v1_0/search/histories',
  });
}

export function DelHistory() {
  return service.request({
    method: 'delete',
    url: '/app/v1_0/search/histories',
  });
}

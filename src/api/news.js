import service from '@/utils/request';

export function GetDetailed(article_id) {
  return service.request({
    method: 'get',
    url: `/app/v1_0/articles/${article_id}`,
  });
}
//评论

export function GetComments(params) {
  return service.request({
    method: 'get',
    url: '/app/v1_0/comments',
    params,
  });
}
//点赞
export function Likings(data) {
  return service.request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data,
  });
}

export function AddComments(data) {
  return service.request({
    method: 'post',
    url: '/app/v1_0/comments',
    data,
  });
}

export function CancelLiking(target) {
  return service.request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${target}`,
  });
}

export function Collection(data) {
  return service.request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data,
  });
}

export function CancelCollection(target) {
  return service.request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${target}`,
  });
}

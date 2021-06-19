import service from '@/utils/request';

//用户频道
export function GetInfo() {
  return service.request({
    method: 'get',
    url: '/app/v1_0/user/channels',
  });
}
//新闻频道
export function GetArticles(params) {
  return service.request({
    method: 'get',
    url: '/app/v1_1/articles',
    params,
  });
}
//获取所有新闻频道
export function AllChannel() {
  return service.request({
    method: 'get',
    url: '/app/v1_0/channels',
  });
}
//删除指定用户频道
export function DelChannel(channelId) {
  return service.request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`,
  });
}

//添加新闻频道
export function AddChannel(channels) {
  return service.request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels,
    },
  });
}
//关注
export function Followings(userId) {
  return service.request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: { target: userId },
  });
}

//取消关注
export function Cancel(target) {
  return service.request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${target}`,
  });
}

//编辑用户资料
export function EditUser(data) {
  return service.request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data,
  });
}
//获取用户个人资料
export function UserInfo() {
  return service.request({
    method: 'get',
    url: '/app/v1_0/user/profile',
  });
}
//关注列表
export function Follow(params) {
  return service.request({
    method: 'get',
    url: '/app/v1_0/user/followings',
    params,
  });
}
//粉丝列表
export function Followers(data) {
  return service.request({
    method: 'get',
    url: '/app/v1_0/user/followers',
    data,
  });
}
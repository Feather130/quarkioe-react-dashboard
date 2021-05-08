import request from '@/utils/request';

export async function queryCurrent() {
  return request('/user/currentUser', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.com.nsn.cumulocity.user+json;',
    },
  });
}

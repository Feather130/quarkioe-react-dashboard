import request from '@/utils/request';

export interface LoginParamsType {
  tenant: string;
  userName: string;
  password: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/user/currentUser?auth', {
    headers: {
      Authorization: `Basic ${btoa(
        `${params.tenant}/${params.userName}:${params.password}`,
      )}`,
    },
  });
}

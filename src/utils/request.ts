import { Canceler, extend } from 'umi-request';
import { notification } from 'antd';

const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const { status } = response;

    notification.error({
      message: `请求错误 ${status}`,
      description: response.statusText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

const request = extend({
  errorHandler,
  getResponse: true,
});

// const pendingRequests: { btoaUrl: string; cancel: Canceler; }[] = [];

request.interceptors.request.use((url, options) => {
  // 为所有非登录请求添加鉴权
  const optionsCopy = Object.assign(options);
  if (url !== '/user/currentUser?auth') {
    optionsCopy.headers.Authorization = `Basic ${sessionStorage.getItem(
      'q6e',
    )}`;
  }
  optionsCopy.headers.UseXBasic = true;

  // 为get请求增加重复判断(尝试，未测试，半成品)
  // if (options.method === 'get' && url !== '/user/currentUser?auth') {
  //   const CancelToken = request.CancelToken;
  //   const { token, cancel } = CancelToken.source();

  //   optionsCopy.cancelToken = token

  //   const btoaUrl = btoa(url)
  //   const hits = pendingRequests.filter((item) => item.btoaUrl === btoaUrl);
  //   if (hits.length) {
  //     hits.forEach((item) => item.cancel());
  //   }
  //   pendingRequests.push({
  //     btoaUrl,
  //     cancel
  //   });
  // }

  return {
    url,
    options: optionsCopy,
  };
});

export default request;

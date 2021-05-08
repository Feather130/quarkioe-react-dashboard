import React from 'react';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import PageLoading from '@/components/PageLoading';

interface SecurityLayoutState {
  isReady: boolean;
  queryString: string;
}

class SecurityLayout extends React.Component<SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
    queryString: '',
  };

  componentDidMount() {
    const queryString = stringify({
      redirect: window.location.href,
    });
    this.setState({
      isReady: true,
      queryString,
    });
  }

  render() {
    const { isReady, queryString } = this.state;
    const { children } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = sessionStorage.getItem('q6e');

    if (!isReady) {
      return <PageLoading />;
    }

    if (!isLogin && window.location.pathname !== '/login') {
      return <Redirect to={`/login?${queryString}`} />;
    }
    return children;
  }
}

export default SecurityLayout;

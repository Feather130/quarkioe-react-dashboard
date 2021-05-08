import React, { Component, ErrorInfo } from 'react';

interface PropsType {
}

interface StateType {
  hasError: boolean
}

class ErrorBoundaries extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1 style={{ color: 'pink', fontSize: 50 }}>阿欧，出问题了</h1>;
    }

    return this.props.children;

  }
}

export default ErrorBoundaries;

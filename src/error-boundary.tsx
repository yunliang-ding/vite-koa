import React from "react";

export default class ErrorBoundaryComponent extends React.Component {
  props = {
    children: null,
  };
  state = {
    hasError: false,
    error: "",
  };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" } as any;
  }
  static getDerivedStateFromError() {
    // 更新state，以便下一次渲染可以显示回退UI
    return { hasError: true };
  }
  componentDidCatch(error: Error): void {
    this.setState({
      error,
    });
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return <pre style={{ color: "red" }}>{String(this.state.error)}</pre>;
    }
    return this.props.children;
  }
}
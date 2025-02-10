import React from "react";

export default class ErrorBoundaryComponent extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" } as any;
  }
  state = {
    hasError: false,
    error: "",
  };
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
      return (
        <pre style={{ color: "red", whiteSpace: "pre-wrap" }}>
          {String(this.state.error)}
        </pre>
      );
    }
    return (this.props as any).children;
  }
}

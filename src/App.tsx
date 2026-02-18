import React from "react";
import { Suspense } from "react";
import AppRouter from "./routes/AppRouter";

function Loader() {
  return <div className="text-center p-16">Loading...</div>;
}

// Add a simple error boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = {hasError: false};
  }
  static getDerivedStateFromError() {
    return {hasError: true};
  }
  render() {
    if (this.state.hasError) return <div>An error occurred. Please reload the page.</div>;
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <AppRouter />
      </Suspense>
    </ErrorBoundary>
  );
}

import React, { ErrorInfo, ReactNode } from 'react';

// Fix: Declare Sentry global to avoid TypeScript "Cannot find name" errors
declare const Sentry: any;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Fix: Use React.Component to ensure generic props and state are correctly inherited and recognized by the compiler
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // Fix: Access global Sentry after declaring it to track production anomalies
    if (typeof Sentry !== 'undefined') {
       Sentry.captureException(error);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center glass-panel rounded-3xl m-4 border-red-500/20">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          </div>
          <h2 className="text-2xl font-space font-bold mb-2">Systems Malfunction</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            The mission control encountered an unexpected anomaly in this sector. Data recovery is in progress.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Reboot Application
          </button>
        </div>
      );
    }

    // Fix: Use this.props.children instead of this.children in class components
    return this.props.children;
  }
}

export default ErrorBoundary;

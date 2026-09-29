import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#FAF8F5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#162E21', fontFamily: 'serif' }}>Sri Krishna Ayurvedic Clinic</h2>
          <p style={{ color: '#555', maxWidth: '500px', lineHeight: '1.6' }}>
            An unexpected error occurred while loading this section. Please click below to refresh the application.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '12px 24px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px' }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);

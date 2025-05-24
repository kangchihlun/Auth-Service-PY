import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import { authService } from './services/authService';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    useEffect(() => {
        const token = authService.getToken();
        setIsAuthenticated(!!token);
    }, []);

    const handleAuthSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    if (isAuthenticated) {
        return (
            <div className="app">
                <h1>Welcome!</h1>
                <p>You are now authenticated.</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="app">
            <h1>Authentication Demo</h1>
            <div className="auth-container">
                <AuthForm
                    mode={showSignup ? 'signup' : 'signin'}
                    onSuccess={handleAuthSuccess}
                />
                <button
                    className="toggle-auth"
                    onClick={() => setShowSignup(!showSignup)}
                >
                    {showSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                </button>
            </div>
        </div>
    );
}

export default App; 
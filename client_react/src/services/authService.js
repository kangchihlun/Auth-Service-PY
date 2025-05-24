const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const authService = {
    async signup(email, name, password) {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, password }),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Signup failed');
            }
            
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    async signin(email, password) {
        try {
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch(`${API_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Signin failed');
            }
            
            const data = await response.json();
            // Store token in localStorage
            localStorage.setItem('token', data.access_token);
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout() {
        localStorage.removeItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    }
}; 
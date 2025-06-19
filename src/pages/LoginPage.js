import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api'; // Assuming you have an api.js utility for axios
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [backendError, setBackendError] = useState('');
    const navigate = useNavigate();

    const {setIsLoggedIn}=useContext(AuthContext);

    // Client-side validation
    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 5) {
            newErrors.password = 'Password must be at least 5 characters.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBackendError(''); // Clear previous backend errors
        setErrors({});       // Clear previous validation errors

        if (validateForm()) {
            setLoading(true);
            try {
                // Call your backend login API
                const response = await api.post('/auth/login', { email, password });
                // Assuming your backend returns a token upon successful login
                const { token } = response.data;
                localStorage.setItem('token', token); 
                setIsLoggedIn(true);
                navigate('/'); // Redirect to homepage or dashboard after successful login
            } catch (err) {
                console.error('Login error:', err);
                // Handle different types of errors from the backend
                if (err.response && err.response.data && err.response.data.message) {
                    setBackendError(err.response.data.message);
                } else {
                    setBackendError('Login failed. Please try again.');
                }
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out">
                <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
                    Welcome Back!
                </h2>
                <p className="text-center text-gray-600 mb-6">Log in to your StayFinder account.</p>

                {backendError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-6" role="alert">
                        <span className="block sm:inline">{backendError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`mt-1 block w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base`}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`mt-1 block w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base`}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "password-error" : undefined}
                        />
                        {errors.password && <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-8 text-sm">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="font-semibold text-blue-600 hover:text-blue-800 transition duration-300 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

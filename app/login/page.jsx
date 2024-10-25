"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("email: " + email);
    
        try {
            // Use query parameters for GET request
            const response = await axios.get('http://localhost:8000/login', {
                    email: email,
                    password: password
                
            });
    
            if (response.data.message === 'Login successful') {
                // console.log("logged in");
                // window.push("/homepage")
                router.push("/dashboard/homePage")
                // Redirect to dashboard or other page on successful login
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };
    



    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    );
}

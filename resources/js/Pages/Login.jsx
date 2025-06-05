import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const Login = () => {
    const [values, setValues] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState(null);

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        router.post('/auth/login', values, {
            onError: (err) => {
                console.log(err)
                setErrors(err)
            },
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                {errors && (
                    <p className="mb-4 text-red-500 text-sm text-center">
                        {errors.message || 'Login gagal'}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Masukkan email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Masukkan password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

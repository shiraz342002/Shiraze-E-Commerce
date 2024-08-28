import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [AccountStatus, setAccountStatus] = useState('Sign Up');
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const onSubmit = async (data) => {
        if (AccountStatus === 'Login') {
            const { name, ...loginData } = data;
            data = loginData;
        }
    
        try {
            const url = AccountStatus === 'Login'
                ? "http://localhost:3000/user/login"
                : "http://localhost:3000/user/register";
    
            let response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const responseData = await response.json();
            console.log('Response Data:', responseData); 
    
            if (response.ok) {
                const token = responseData.data?.token;
                if (token) {
                    localStorage.setItem('authToken', token);
                    if (AccountStatus === 'Login') {
                        toast.success("Logged in successfully!");
                    } else {
                        toast.success("Registered successfully!");
                    }
                } else {
                    toast.error('Problem with logn try again');
                }
            } else {
                toast.error(`Error: ${responseData.meta.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred.');
        }
    };
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-700">
                <div className='flex items-center gap-2 mb-2 mt-10'>
                    <p className='text-3xl'>{AccountStatus}</p>
                    <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
                </div>
                {AccountStatus === 'Sign Up' && (
                    <input
                        {...register('name', { 
                            required: 'Name is required',
                            minLength: {
                                value: 3,
                                message: 'Name should have a minimum length of 3 characters',
                            },
                            maxLength: {
                                value: 14,
                                message: 'Name should have a maximum length of 14 characters',
                            }
                        })}
                        type="text"
                        className='w-full border px-3 py-2 my-2 border-gray-800'
                        placeholder='Name'
                    />
                )}
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                <input
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address'
                        }
                    })}
                    type="email"
                    className='w-full border px-3 py-2 my-2 border-gray-800'
                    placeholder='Email'
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <input
                    {...register('password', { required: 'Password is required' })}
                    type="password"
                    className='w-full border px-3 py-2 my-2 border-gray-800'
                    placeholder='Password'
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <div className="flex justify-between text-sm font-bold w-full mt-3">
                    <p className='cursor-pointer'>Forgot Password?</p>
                    {
                        AccountStatus === 'Login'
                        ? <p onClick={() => setAccountStatus('Sign Up')} className='cursor-pointer'>Create Account</p>
                        : <p onClick={() => setAccountStatus('Login')} className='cursor-pointer'>Login Account</p>
                    }
                </div>
                <button
                    type="submit"
                    className='mt-10 text-sm py-3 px-9 border bg-black text-white'
                    disabled={isSubmitting}
                >
                    {AccountStatus === 'Login' ? 'Sign in' : 'Sign Up'}
                </button>
            </form>
            <ToastContainer />
        </>
    );
};

export default Login;

import React from 'react'
import { useState, useEffect } from 'react'
import '../style/login.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ HandleLogin }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(e) {
        e.preventDefault();
        try {
            const loginRes = await axios.post(`${backendUrl}/auth/admin`, { email, password }, {
                withCredentials: true
            });

            toast.success("Đăng nhập thành công")

            localStorage.setItem('accessToken', loginRes.data.data.token);

            localStorage.setItem('adminId', loginRes.data.data.sub);

            localStorage.setItem('name', loginRes.data.data.name);

            localStorage.setItem('time', loginRes.data.data.time);

            HandleLogin(true);

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi đăng nhập");
        }
    }

    return (
        <div className='login-container'>
            <div className='login-workplace'>

                <div className='login-header'>
                    <h5>Đăng nhập Admin</h5>
                </div>

                <div className='input-workplace'>
                    <form onSubmit={e => login(e)}>
                        <label htmlFor="">Email</label>
                        <input type="text" autoComplete="current-email" placeholder='Nhập email' value={email} onChange={e => setEmail(e.target.value)} />

                        <label htmlFor="">Password</label>
                        <input type="password" autoComplete="current-password" placeholder='Nhập mật khẩu' value={password} onChange={e => setPassword(e.target.value)} />

                        <button type='submit' className='login-btn'>Đăng nhập</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login

import React from 'react'
import { useState, useEffect } from 'react'
import '../style/login.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ HandleLogin }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        try {
            const loginRes = await axios.post(`${backendUrl}/auth/admin`, { email, password }, {
                withCredentials: true
            });

            toast.success("Đăng nhập thành công")

            // console.log(loginRes.data.data);

            localStorage.setItem('accessToken', loginRes.data.data.token);

            localStorage.setItem('adminId', loginRes.data.data.sub);

            localStorage.setItem('name', loginRes.data.data.name);

            localStorage.setItem('time', loginRes.data.data.time);

            HandleLogin(true);

        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi đăng nhập");
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='login-container'>
            <div className='login-workplace'>

                <div className='login-header'>
                    <h5>Đăng nhập Admin</h5>
                </div>

                <div className='input-workplace'>

                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Nhập email' value={email} onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="">Password</label>
                    <input type="password" placeholder='Nhập mật khẩu' value={password} onChange={e => setPassword(e.target.value)} />

                    <button className='login-btn' onClick={login}>Đăng nhập</button>

                </div>

            </div>
        </div>
    )
}

export default Login

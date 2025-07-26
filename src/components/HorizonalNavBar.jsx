import React from 'react'
import { useState, useEffect } from 'react'
import '../style/h.css'
import { toast } from 'react-toastify'
import axios from 'axios'

const HorizonalNavBar = ({ title, HandleLogin }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    async function logout() {
        try {
            const logoutRes = await axios.post(`${backendUrl}/auth/logout`, {}, { withCredentials: true });

            toast.success("Đăng xuất thành công")

            HandleLogin(false);

            localStorage.removeItem("accessToken");
            localStorage.removeItem("adminId");
            localStorage.removeItem("time");

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='h-container'>
            <h6>DashBoard / {title}</h6>

            <button onClick={logout}>Đăng xuất</button>
        </div>
    )
}

export default HorizonalNavBar

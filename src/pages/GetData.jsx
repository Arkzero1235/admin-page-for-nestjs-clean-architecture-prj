import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const GetData = ({ HandleSetRevenue, HandleSetSumData, RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        async function getRevenueData() {
            const accessToken = localStorage.getItem("accessToken");
            try {
                const revenueRes = await axios.get(`${backendUrl}/order/revenue`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })

                const sumRes = await axios.get(`${backendUrl}/order/sum`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })

                // console.log(sumRes.data.data);

                HandleSetSumData(sumRes.data.data);

                HandleSetRevenue(revenueRes.data.data);

                toast.success("Lấy doanh thu thành công");

            } catch (error) {
                console.error(error);
                toast.error("Lỗi khi lấy dữ liệu doanh thu");
                toast.error(error.response.data.message);
                RenewToken();
            }
        }

        getRevenueData()
    }, [])

    return (<></>)
}

export default GetData

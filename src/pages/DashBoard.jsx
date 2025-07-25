import React, { useEffect, useState } from 'react'
import '../style/db.css'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import GetData from './GetData';

const DashBoard = ({ RenewToken, revenueData, sumData, HandleSetRevenue, HandleSetSumData }) => {
    const data = [
        { date: "2025-07-18", totalRevenue: 88000 },
        { date: "2025-07-19", totalRevenue: 102000 },
        { date: "2025-07-20", totalRevenue: 113000 },
        { date: "2025-07-21", totalRevenue: 120000 },
        { date: "2025-07-22", totalRevenue: 95000 },
        { date: "2025-07-23", totalRevenue: 134000 },
        { date: "2025-07-24", totalRevenue: 164000 },
        { date: "2025-07-25", totalRevenue: 157000 },
        { date: "2025-07-26", totalRevenue: 145000 },
        { date: "2025-07-27", totalRevenue: 170000 },
        { date: "2025-07-28", totalRevenue: 106000 },
        { date: "2025-07-29", totalRevenue: 112000 },
        { date: "2025-07-30", totalRevenue: 158000 },
        { date: "2025-07-31", totalRevenue: 99000 },
        { date: "2025-08-01", totalRevenue: 123000 },
        { date: "2025-08-02", totalRevenue: 174000 },
        { date: "2025-08-03", totalRevenue: 108000 },
        { date: "2025-08-04", totalRevenue: 166000 },
        { date: "2025-08-05", totalRevenue: 139000 },
        { date: "2025-08-06", totalRevenue: 104000 },
        { date: "2025-08-07", totalRevenue: 178000 },
        { date: "2025-08-08", totalRevenue: 97000 },
        { date: "2025-08-09", totalRevenue: 141000 },
        { date: "2025-08-10", totalRevenue: 119000 },
        { date: "2025-08-11", totalRevenue: 150000 },
        { date: "2025-08-12", totalRevenue: 128000 },
        { date: "2025-08-13", totalRevenue: 133000 },
        { date: "2025-08-14", totalRevenue: 147000 },
        { date: "2025-08-15", totalRevenue: 165000 },
        { date: "2025-08-16", totalRevenue: 109000 }
    ];

    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        setFullData([...revenueData, ...data]);
    }, [revenueData])

    return (
        <div className='db-container'>
            <GetData HandleSetRevenue={HandleSetRevenue} HandleSetSumData={HandleSetSumData} RenewToken={RenewToken} />

            <div className='quantity-re-container'>
                <div className='block one'>
                    <h6>Số lượng người dùng: </h6>
                    <h1>{sumData.totalUsers}</h1>
                </div>
                <div className='block two'>
                    <h6>Số lượng sản phẩm: </h6>
                    <h1>{sumData.totalProducts}</h1>
                </div>
                <div className='block three'>
                    <h6>Số lượng danh mục: </h6>
                    <h1>{sumData.totalCategories}</h1>
                </div>
                <div className='block four'>
                    <h6>Số lượng banner: </h6>
                    <h1>{sumData.totalSliders}</h1>
                </div>
                <div className='block five'>
                    <h6>Số đơn hàng thành công: </h6>
                    <h1>{sumData.totalSuccessfulOrders}</h1>
                </div>
            </div>
            <div className='re-chart-container'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fullData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#8884d8" />
                        <YAxis stroke="#82ca9d" />
                        <Tooltip contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #ccc" }} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="totalRevenue"
                            stroke="#ff7300"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            dot={{ r: 4 }}
                            animationDuration={800}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <h6>Biểu đồ doanh thu</h6>
            </div>
        </div>
    )
}

export default DashBoard

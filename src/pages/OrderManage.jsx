import React from 'react'
import { useState, useEffect } from 'react'
import "../style/ca.css"
import "../style/or.css"
import axios, { all } from 'axios'
import { toast } from 'react-toastify'

const OrderManage = ({ RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // const userId = '9ed73712-adc1-4ecc-a3b0-d78e7f015ad0'

    const [allData, setAllData] = useState([]);
    const [userId, setUserId] = useState('');
    const [orderId, setOrderId] = useState('');

    async function getAllOrderData() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const getRes = await axios.get(`${backendUrl}/order`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách đơn hàng thành công")

            setAllData(getRes.data.data)

            // console.log(getRes.data.data);

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message[0] || "Lỗi khi lấy danh sách đơn hàng");
            RenewToken();
        }
    }

    async function getOrderData() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const getRes = await axios.get(`${backendUrl}/order/${userId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách đơn hàng thành công")

            setAllData(getRes.data.data)

            // console.log(getRes.data.data);

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message[0] || "Lỗi khi lấy danh sách đơn hàng");
            RenewToken();
        }
    }

    async function submitOrder() {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const submitRes = await axios.patch(`${backendUrl}/order/delivery/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Xác nhận đơn hàng thành công")

            getAllOrderData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi xác nhận đơn hàng");
            RenewToken();
        }
    }

    async function cancelOrder() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const submitRes = await axios.delete(`${backendUrl}/order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Hủy giao đơn hàng thành công")

            getAllOrderData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi hủy đơn hàng");
            RenewToken();
        }
    }

    useEffect(() => {
        getAllOrderData()
    }, [])

    return (
        <div className='ca-container'>
            <div className='ca-header'>Quản Lý Đơn Hàng</div>

            <div className='ca-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách đơn hàng</h6>
                    <div className='search'>
                        <input type="text" placeholder='Nhập id người dùng' value={userId} onChange={e => setUserId(e.target.value)} />
                        <button onClick={getOrderData}>Tìm đơn hàng</button>
                    </div>
                </div>

                <div className='list-container'>

                    {
                        allData.map((order, index) => {
                            return (
                                <>
                                    <div className='orders' key={index}>

                                        <div className='orders-title'>

                                            <h6>OrderId: {order.id}</h6>

                                            <h6>Tổng: {order.total}</h6>

                                            <h6>Trạng thái: {order.status}</h6>

                                            <div className='order-option'>

                                                {
                                                    order.status === "IN PROCESS" &&
                                                    <button onClick={() => {
                                                        setOrderId(order.id);
                                                        submitOrder();
                                                    }}>Xác nhận đơn hàng</button>
                                                }

                                                {
                                                    order.status !== "PENDING" && order.status !== "CANCEL" && order.status !== "SUCCESS" &&
                                                    <button onClick={() => {
                                                        setOrderId(order.id);
                                                        cancelOrder();
                                                    }}>Hủy đơn hàng</button>
                                                }

                                            </div>

                                        </div>

                                        <div className='order'>
                                            {
                                                order.details.map((detail, index) => {
                                                    return (
                                                        <div className='one-detail' key={index}>

                                                            <div className='one-label' key={index}>
                                                                <h6>Order Detail Id: {detail.id}</h6>
                                                                <h6>Tên sản phẩm: {detail.product.name}</h6>
                                                                <h6>Số lượng: {detail.quantity}</h6>
                                                                <h6>Khuyến mãi: {detail.product.stock}</h6>
                                                                <h6>Giá gốc: {detail.product.price}</h6>
                                                                <h6>Tổng tiền sản phẩm này: {detail.total}</h6>
                                                                <h6>Ngày tạo: {new Date(detail.createdAt).toLocaleDateString("vi-VN")}</h6>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>

        </div >

    )
}

export default OrderManage

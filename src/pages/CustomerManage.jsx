import { useState, useEffect } from 'react'
import '../style/cm.css'
import axios, { all } from 'axios'
import { toast } from 'react-toastify'

const CustomerManage = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlYWQ5ZTdjLTRlODctNDMzOS1iMGEwLTAzNTE5YzM4MGM3YiIsIm5hbWUiOiJBZG1pbiAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUzMzY4NzkzLCJleHAiOjE3NTM2Mjc5OTN9.JZTK1GxN0xhKy3L3ArmY1E1V6JhSJY9F9ZzKX-cUq0o"

    const [changeCount, setChangeCount] = useState(0);

    const [allData, setAllData] = useState([]);
    const [findEmail, setFindEmail] = useState('');
    const [foundData, setFoundData] = useState([]);

    const [id, setId] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const findByEmail = () => {
        const result = allData.filter(user => user.email === findEmail);
        setFoundData(result);
    };

    const setUpdateData = (id, username, email, address, phone) => {
        setId(id)
        setUsername(username)
        setEmail(email)
        setAddress(address)
        setPhone(phone)
    }

    async function updateUser() {
        try {
            const updateRes = await axios.patch(`${backendUrl}/user/${id}`, { username, email, address, phone }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Cập nhật người dùng thành công")

            setChangeCount(prev => prev + 1);
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật người dùng");
            toast.error(error.response.data.message[0]);
        }
    }

    async function deleteUser(id) {
        try {
            const delRes = await axios.delete(`${backendUrl}/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Xóa người dùng thành công")

            getUsersData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa người dùng");
            toast.error(error.response.data.message[0]);
        }
    }

    async function getUsersData() {
        try {
            const getUsersRes = await axios.get(`${backendUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách người dùng thành công")

            setAllData(getUsersRes.data.data)

            setFoundData(getUsersRes.data.data)
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi lấy danh sách người dùng");
            toast.error(error.response.data.message[0]);
        }
    }

    useEffect(() => {

        getUsersData()

    }, [changeCount])

    return (
        <div className='cm-container'>
            <div className='cm-header'>Quản Lý Người Dùng</div>

            <div className='cm-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách người dùng</h6>
                    <div className='search'>
                        <input type="text" placeholder='Nhập email cần tìm' value={findEmail} onChange={e => setFindEmail(e.target.value)} />
                        <button onClick={findByEmail}>Tìm</button>
                    </div>
                </div>

                <div className="cm-list mt-4">
                    <table className="table table-striped table-bordered table-hover my-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>id</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foundData.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index++}</td>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setUpdateData(user.id, user.username, user.email, user.address, user.phone);
                                                        }
                                                    }>Chỉnh sửa</button>
                                                    <button onClick={() => deleteUser(user.email)}>Xóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header">
                                    <h6 className="modal-title">Chỉnh sửa thông tin</h6>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>


                                <div className="modal-body">
                                    <label htmlFor="">Username</label>
                                    <input type="text" placeholder='Nhập username' value={username} onChange={e => setUsername(e.target.value)} />

                                    <label htmlFor="">Email</label>
                                    <input type="text" placeholder='Nhập email' value={email} onChange={e => setEmail(e.target.value)} />

                                    <label htmlFor="">Địa chỉ</label>
                                    <input type="text" placeholder='Nhập địa chỉ' value={address} onChange={e => setAddress(e.target.value)} />

                                    <label htmlFor="">Số điện thoại</label>
                                    <input type="text" placeholder='Nhập số điện thoại' value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#04D481" }} onClick={updateUser}>Cập nhật</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}

export default CustomerManage

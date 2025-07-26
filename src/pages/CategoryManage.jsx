import { useState, useEffect } from 'react'
import "../style/ca.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const CategoryManage = ({ RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [allData, setAllData] = useState([]);
    const [findName, setFindName] = useState('');
    const [foundData, setFoundData] = useState([]);

    const [id, setId] = useState('');
    const [name, setName] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openModal2 = () => setShowModal2(true);
    const closeModal2 = () => setShowModal2(false);

    const findByName = () => {
        const result = allData.filter(cate => cate.name === findName);
        setFoundData(result);
    };

    async function getCategoryData() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const getCategoriesRes = await axios.get(`${backendUrl}/category`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách danh mục thành công")

            setAllData(getCategoriesRes.data.data)

            setFoundData(getCategoriesRes.data.data)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi lấy danh sách danh mục");
            RenewToken();
        }
    }

    async function updateCate() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const updateRes = await axios.patch(`${backendUrl}/category/${id}`, { name }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Cập nhật danh mục thành công")

            getCategoryData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi cập nhật danh mục");
            RenewToken();
        }
    }

    async function createCate() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const createRes = await axios.post(`${backendUrl}/category`, { name }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Tạo danh mục thành công")

            getCategoryData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi tạo mới danh mục");
            RenewToken();
        }
    }

    async function deleteCate(id) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const delRes = await axios.delete(`${backendUrl}/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Xóa danh mục thành công")

            getCategoryData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi xóa danh mục");
            RenewToken();
        }
    }

    useEffect(() => {

        getCategoryData()

    }, [])

    return (
        <div className='ca-container'>
            <div className='ca-header'>Quản Lý Danh Mục</div>

            <div className='ca-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách danh mục</h6>
                    <div className='search'>
                        <button style={{ borderRadius: "5px", backgroundColor: "#FDD60D" }} onClick={openModal2}>Thêm danh mục</button>
                        <input type="text" placeholder='Nhập danh mục cần tìm' value={findName} onChange={e => setFindName(e.target.value)} />
                        <button onClick={findByName}>Tìm</button>
                    </div>
                </div>

                <div className="ca-list mt-4">
                    <table className="table table-striped table-bordered table-hover my-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Tên danh mục</th>
                                <th>Ngày tạo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foundData.map((cate, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index++}</td>
                                            <td>{cate.name}</td>
                                            <td>{new Date(cate.createdAt).toLocaleDateString("vi-VN")}</td>
                                            <td>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setId(cate.id);
                                                            setName(cate.name);
                                                        }
                                                    }>Chỉnh sửa</button>
                                                    <button onClick={() => deleteCate(cate.id)}>Xóa</button>
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
                                    <label htmlFor="">Name</label>
                                    <input type="text" placeholder='Nhập tên danh mục' value={name} onChange={e => setName(e.target.value)} />
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#04D481" }} onClick={updateCate}>Cập nhật</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {showModal2 && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header" style={{ backgroundColor: "#FDD60D" }}>
                                    <h6 className="modal-title">Tạo danh mục mới</h6>
                                    <button type="button" className="btn-close" onClick={closeModal2}></button>
                                </div>


                                <div className="modal-body">
                                    <label htmlFor="">Name</label>
                                    <input type="text" placeholder='Nhập tên danh mục' value={name} onChange={e => setName(e.target.value)} />
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal2}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#FDD60D" }} onClick={createCate}>Tạo</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )
}

export default CategoryManage

import React from 'react'
import { useState, useEffect } from 'react'
import "../style/ca.css"
import "../style/pr.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const BannerManage = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlYWQ5ZTdjLTRlODctNDMzOS1iMGEwLTAzNTE5YzM4MGM3YiIsIm5hbWUiOiJBZG1pbiAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUzMzg1NTQxLCJleHAiOjE3NTM2NDQ3NDF9.EEuWKK9biCyss-aNtEaRTSyVQwPFvkKfQSRRWM1KZs4"
    const adminId = 'eead9e7c-4e87-4339-b0a0-03519c380c7b'

    const [allData, setAllData] = useState([]);
    const [findName, setFindName] = useState('');
    const [foundData, setFoundData] = useState([]);

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [originalData, setOriginalData] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openModal2 = () => setShowModal2(true);
    const closeModal2 = () => setShowModal2(false);

    const setUpdateData = (banner) => {
        setId(banner.id)
        setTitle(banner.title)
        setUrl(banner.url)
        setImgUrl(banner.image)
        setOriginalData(banner)
    }

    const findByName = () => {
        const result = allData.filter(banner => banner.title === findName);
        setFoundData(result);
    };

    async function getBannerData() {
        try {
            const getRes = await axios.get(`${backendUrl}/slider`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách banner thành công")

            setAllData(getRes.data.data)

            setFoundData(getRes.data.data)
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi lấy danh sách banner");
            toast.error(error.response.data.message[0]);
        }
    }

    async function createBanner() {
        try {
            const createRes = await axios.post(`${backendUrl}/slider`, { title, url, image: imgUrl, adminId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Tạo banner mới thành công")

            getBannerData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi tạo banner mới");
            toast.error(error.response.data.message[0]);
        }
    }

    async function updateBanner() {
        try {
            if (!originalData) return;

            const updatedFields = {};

            if (title !== originalData.title) updatedFields.title = title;
            if (imgUrl !== originalData.image) updatedFields.image = imgUrl;
            if (url !== originalData.url) updatedFields.url = url;
            updatedFields.adminId = adminId;

            if (!updatedFields.title && !updatedFields.url && !updatedFields.image) {
                toast.warning("Không có dữ liệu mới để cập nhật");
                return;
            }

            const res = await axios.patch(`${backendUrl}/slider/${id}`, updatedFields, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Cập nhật banner thành công")

            getBannerData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật banner");
            toast.error(error.response.data.message);
        }
    }

    async function deleteBanner(id) {
        try {
            const delRes = await axios.delete(`${backendUrl}/slider/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Xóa banner thành công")

            getBannerData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi xóa banner");
            toast.error(error.response.data.message[0]);
        }
    }

    useEffect(() => {

        getBannerData()

    }, [])

    return (
        <div className='ca-container'>
            <div className='ca-header'>Quản Lý Banner</div>

            <div className='ca-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách banner</h6>
                    <div className='search'>
                        <button style={{ borderRadius: "5px", backgroundColor: "#FDD60D" }} onClick={openModal2}>Thêm banner</button>
                        <input type="text" placeholder='Nhập banner cần tìm' value={findName} onChange={e => setFindName(e.target.value)} />
                        <button onClick={findByName}>Tìm</button>
                    </div>
                </div>

                <div className="ca-list mt-4">
                    <table className="table table-striped table-bordered table-hover my-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Tên banner</th>
                                <th>Image</th>
                                <th>Link to</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foundData.map((banner, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index++}</td>
                                            <td>{banner.title}</td>
                                            <td>
                                                <div className='pr-img' style={{ backgroundImage: `url(${banner.image})`, height: '100px' }}></div>
                                            </td>
                                            <td>{banner.url}</td>
                                            <td>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setUpdateData(banner);
                                                        }
                                                    }>Chỉnh sửa</button>
                                                    <button onClick={() => deleteBanner(banner.id)}>Xóa</button>
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
                                    <label htmlFor="">Title</label>
                                    <input type="text" placeholder='Nhập tên banner' value={title} onChange={e => setTitle(e.target.value)} />

                                    <label htmlFor="">Url</label>
                                    <input type="text" placeholder='Nhập link website' value={url} onChange={e => setUrl(e.target.value)} />

                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder='Nhập link ảnh' value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                                    <div className='img-review'
                                        style={{ backgroundImage: `url(${imgUrl})` }}
                                    ></div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#04D481" }} onClick={updateBanner}>Cập nhật</button>
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
                                    <label htmlFor="">Title</label>
                                    <input type="text" placeholder='Nhập tên banner' value={title} onChange={e => setTitle(e.target.value)} />

                                    <label htmlFor="">Url</label>
                                    <input type="text" placeholder='Nhập link website' value={url} onChange={e => setUrl(e.target.value)} />

                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder='Nhập link ảnh' value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                                    <div className='img-review'
                                        style={{ backgroundImage: `url(${imgUrl})` }}
                                    ></div>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal2}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#FDD60D" }} onClick={createBanner}>Tạo</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )
}

export default BannerManage

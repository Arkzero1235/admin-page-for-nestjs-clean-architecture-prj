import { useState, useEffect } from 'react'
import "../style/pr.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const StorageManage = ({ RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlYWQ5ZTdjLTRlODctNDMzOS1iMGEwLTAzNTE5YzM4MGM3YiIsIm5hbWUiOiJBZG1pbiAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzUzMzY4NzkzLCJleHAiOjE3NTM2Mjc5OTN9.JZTK1GxN0xhKy3L3ArmY1E1V6JhSJY9F9ZzKX-cUq0o"

    const [allData, setAllData] = useState([]);
    const [findName, setFindName] = useState('');
    const [foundData, setFoundData] = useState([]);

    const [id, setId] = useState('');
    const [storage, setStorage] = useState(0);
    const [originalData, setOriginalData] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const findByName = () => {
        const result = allData.filter(product => product.name === findName);
        setFoundData(result);
    };

    async function getProductData() {
        try {
            const getRes = await axios.get(`${backendUrl}/product`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Lấy danh sách sản phẩm thành công")

            setAllData(getRes.data.data)

            setFoundData(getRes.data.data)
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi lấy danh sách sản phẩm");
            toast.error(error.response.data.message[0]);
            RenewToken();
        }
    }

    async function updateProduct() {
        try {
            if (storage === originalData) {
                toast.warning("Bạn cần nhập số lượng mới để cập nhật");
                return;
            }

            const res = await axios.patch(`${backendUrl}/product/${id}`, { storage: Number(storage) }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Cập nhật kho hàng thành công")

            getProductData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật kho hàng");
            toast.error(error.response.data.message[0]);
            RenewToken();
        }
    }

    useEffect(() => {

        getProductData()

    }, [])

    return (
        <div className='pr-container'>
            <div className='pr-header'>Quản Lý Kho Hàng</div>

            <div className='pr-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách sản phẩm & số lượng trong kho</h6>
                    <div className='search'>
                        <input type="text" placeholder='Nhập sản phẩm cần tìm' value={findName} onChange={e => setFindName(e.target.value)} />
                        <button onClick={findByName}>Tìm</button>
                    </div>
                </div>

                <div className="pr-list mt-4">
                    <table className="table table-striped table-bordered table-hover my-table">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng còn lại trong kho</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foundData.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.storage}</td>
                                            <td>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setOriginalData(product.storage);
                                                            setStorage(product.storage);
                                                            setId(product.id);
                                                        }
                                                    }>Chỉnh sửa</button>
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
                                    <label htmlFor="">Số lượng</label>
                                    <input type="number" placeholder='Nhập số lượng mới' value={storage} onChange={e => { setStorage(e.target.value) }} />
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#04D481" }} onClick={updateProduct}>Cập nhật</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )
}

export default StorageManage

import { useState, useEffect } from 'react'
import "../style/pr.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const SaleManage = ({ RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const accessToken = localStorage.getItem("accessToken");

    const [allData, setAllData] = useState([]);
    const [findName, setFindName] = useState('');
    const [foundData, setFoundData] = useState([]);

    const [id, setId] = useState('');
    const [sale, setSale] = useState(0);
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
            if (sale === originalData) {
                toast.warning("Bạn cần nhập % khuyến mãi mới để cập nhật");
                return;
            }

            const res = await axios.patch(`${backendUrl}/product/${id}`, { stock: Number(sale) }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Cập nhật khuyến mãi thành công")

            getProductData()
        } catch (error) {
            console.error(error);
            toast.error("Lỗi khi cập nhật khuyến mãi");
            toast.error(error.response.data.message[0]);
            RenewToken();
        }
    }

    useEffect(() => {

        getProductData()

    }, [])

    return (
        <div className='pr-container'>
            <div className='pr-header'>Quản Lý Khuyến Mãi</div>

            <div className='pr-workplace'>
                <div className='search-bar'>
                    <h6>Danh sách khuyến mãi sản phẩm</h6>
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
                                <th>Khuyến mãi (%)</th>
                                <th>Giá gốc</th>
                                <th>Giá khuyến mãi</th>
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
                                            <td>{product.stock}</td>
                                            <td>{product.price}</td>
                                            <td>{product.price - (product.price * product.stock / 100)}</td>
                                            <td>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setOriginalData(product.stock);
                                                            setSale(product.stock);
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
                                    <label htmlFor="">Sale (%)</label>
                                    <input type="number" placeholder='Nhập % khuyến mãi' value={sale} onChange={e => { setSale(e.target.value) }} />
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

export default SaleManage

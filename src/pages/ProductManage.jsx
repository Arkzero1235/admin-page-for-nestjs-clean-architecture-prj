import { useState, useEffect } from 'react'
import "../style/pr.css"
import axios from 'axios'
import { toast } from 'react-toastify'

const ProductManage = ({ RenewToken }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [allData, setAllData] = useState([]);
    const [findName, setFindName] = useState('');
    const [foundData, setFoundData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [cateId, setCateId] = useState('');
    const [price, setPrice] = useState(0);
    const [sale, setSale] = useState(0);
    const [storage, setStorage] = useState(0);
    const [originalData, setOriginalData] = useState(null);

    const [findCateId, setFindCateId] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openModal2 = () => setShowModal2(true);
    const closeModal2 = () => setShowModal2(false);

    const setUpdateData = (product) => {
        setId(product.id)
        setName(product.name)
        setDesc(product.description)
        setPrice(product.price)
        setImgUrl(product.image)
        setCateId(product.category.id)
        setOriginalData(product)
    }

    const findByName = () => {
        const result = allData.filter(product => product.name === findName);
        setFoundData(result);
    };

    async function getProductData() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const getRes = await axios.get(`${backendUrl}/product`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            const getCategoriesRes = await axios.get(`${backendUrl}/category`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            // console.log(getRes.data.data);

            toast.success("Lấy danh sách sản phẩm thành công")

            setAllData(getRes.data.data)

            setFoundData(getRes.data.data)

            setCategoryData(getCategoriesRes.data.data)
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi lấy danh sách sản phẩm");
            RenewToken();
        }
    }

    async function createProduct() {
        const accessToken = localStorage.getItem("accessToken");

        if (!cateId) {
            toast.error("Bạn phải chọn 1 danh mục cho sản phẩm này");
            return;
        }

        try {
            const createRes = await axios.post(`${backendUrl}/product`, { name, price: Number(price), image: imgUrl, stock: Number(sale), description: desc, storage: Number(storage), categoryId: cateId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Tạo sản phẩm mới thành công")

            getProductData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi tạo mới sản phẩm");
            RenewToken();
        }
    }

    async function deleteProduct(id) {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const delRes = await axios.delete(`${backendUrl}/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            toast.success("Xóa sản phẩm thành công")

            getProductData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi xóa sản phẩm");
            RenewToken();
        }
    }

    async function updateProduct() {
        const accessToken = localStorage.getItem("accessToken");
        try {
            if (!originalData) return;

            const updatedFields = {};

            if (name !== originalData.name) updatedFields.name = name;
            if (desc !== originalData.description) updatedFields.description = desc;
            if (Number(price) !== originalData.price) updatedFields.price = Number(price);
            if (imgUrl !== originalData.image) updatedFields.image = imgUrl;
            if (cateId !== originalData.category.id) updatedFields.categoryId = cateId;

            const res = await axios.patch(`${backendUrl}/product/${id}`, updatedFields, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            toast.success("Cập nhật sản phẩm thành công")

            getProductData()
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message || "Lỗi khi cập nhật sản phẩm");
            RenewToken();
        }
    }

    useEffect(() => {

        getProductData()

    }, [])

    useEffect(() => {
        const findByCategory = () => {
            const result = allData.filter(product => product.categoryId === findCateId);
            setFoundData(result);
        };

        findByCategory()

    }, [findCateId])

    useEffect(() => {
        if (!findCateId) {
            setFoundData(allData);
        } else {
            const result = allData.filter(product => product.categoryId === findCateId);
            setFoundData(result);
        }
    }, [findCateId])

    return (
        <div className='pr-container'>
            <div className='pr-header'>Quản Lý Sản Phẩm</div>

            <div className='pr-workplace'>
                <div className='search-bar'>
                    <div className='sb-title'>
                        <h6>Danh sách sản phẩm</h6>
                        <select
                            id="category"
                            value={findCateId}
                            onChange={(e) => setFindCateId(e.target.value)}
                            style={{ padding: '10px 10px' }}
                        >
                            <option value="">Tất cả danh mục</option>
                            {categoryData.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='search'>
                        <button style={{ borderRadius: "5px", backgroundColor: "#FDD60D" }} onClick={openModal2}>Thêm sản phẩm</button>

                        <input type="text" placeholder='Nhập sản phẩm cần tìm' value={findName} onChange={e => setFindName(e.target.value)} />

                        <button onClick={findByName}>Tìm</button>
                    </div>
                </div>

                <div className="pr-list mt-4">
                    <table className="table table-bordered my-table">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Mô tả</th>
                                <th>Hình ảnh</th>
                                <th>Giá (VNĐ)</th>
                                <th>Thuộc danh mục</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                foundData.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index++}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>
                                                <div className='pr-img' style={{ backgroundImage: `url(${product.image})` }}
                                                    onClick={() => window.open(product.image, '_blank')}>
                                                </div>
                                            </td>
                                            <td>{product.price}</td>
                                            <td>{product.category.name}</td>
                                            <td style={{ width: '150px' }}>
                                                <div className='option'>
                                                    <button onClick={
                                                        () => {
                                                            openModal();
                                                            setUpdateData(product);
                                                        }
                                                    }>Chỉnh sửa</button>
                                                    <button onClick={() => deleteProduct(product.id)}>Xóa</button>
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
                                    <input type="text" placeholder='Nhập tên sản phẩm' value={name} onChange={e => setName(e.target.value)} />

                                    <label htmlFor="">Description</label>
                                    <input type="text" placeholder='Nhập mô tả sản phẩm' value={desc} onChange={e => setDesc(e.target.value)} />

                                    <label htmlFor="">Price (VNĐ)</label>
                                    <input type="number" placeholder='Nhập giá sản phẩm' value={price} onChange={e => setPrice(Number(e.target.value))} />

                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder='Chọn URL hình ảnh' value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                                    <div className='img-review'
                                        style={{ backgroundImage: `url(${imgUrl})` }}
                                    ></div>

                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        value={cateId}
                                        onChange={(e) => setCateId(e.target.value)}
                                        style={{
                                            padding: '10px 10px'
                                        }}
                                    >
                                        <option value="">-- Chọn danh mục --</option>
                                        {categoryData.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#04D481" }} onClick={updateProduct}>Cập nhật</button>
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
                                    <h6 className="modal-title">Tạo sản phẩm mới</h6>
                                    <button type="button" className="btn-close" onClick={closeModal2}></button>
                                </div>


                                <div className="modal-body">
                                    <label htmlFor="">Name</label>
                                    <input type="text" placeholder='Nhập tên sản phẩm' value={name} onChange={e => setName(e.target.value)} />

                                    <label htmlFor="">Description</label>
                                    <input type="text" placeholder='Nhập mô tả sản phẩm' value={desc} onChange={e => setDesc(e.target.value)} />

                                    <label htmlFor="">Price</label>
                                    <input type="number" placeholder='Nhập giá sản phẩm' value={price} onChange={e => setPrice(Number(e.target.value))} />

                                    <label htmlFor="">Sale</label>
                                    <input type="number" placeholder='Nhập khuyến mãi (%)' value={sale} onChange={e => setSale(Number(e.target.value))} />

                                    <label htmlFor="">Storage</label>
                                    <input type="number" placeholder='Nhập só lượng hiện có' value={storage} onChange={e => setStorage(Number(e.target.value))} />

                                    <label htmlFor="">Image</label>
                                    <input type="text" placeholder='Chọn URL hình ảnh' value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                                    <div className='img-review'
                                        style={{ backgroundImage: `url(${imgUrl})` }}
                                    ></div>

                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        value={cateId}
                                        onChange={(e) => setCateId(e.target.value)}
                                        style={{
                                            padding: '10px 10px'
                                        }}
                                    >
                                        <option value="">-- Chọn danh mục --</option>
                                        {categoryData.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={closeModal2}>Đóng</button>
                                    <button className="btn btn-secondary" style={{ backgroundColor: "#FDD60D" }} onClick={createProduct}>Tạo</button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )
}

export default ProductManage

import React, { useState } from 'react'
import '../style/v.css'

const VerticalNavBar = ({ HandleChoose, choose }) => {

    const [name, setName] = useState(localStorage.getItem("name"));

    return (
        <div className='v-container'>
            <nav className="navbar navbar-expand-lg flex-column align-items-start sidebar">

                <div className='v-nav-header'>

                    <div className='h-1 sub-header'>
                        <div className='logo'></div>
                        <h5>Admin Page</h5>
                    </div>

                    <div className='h-2 sub-header'>
                        <div className='avatar'></div>
                        <h5>{name}</h5>
                    </div>

                </div>

                <button
                    className="navbar-toggler mb-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse flex-column w-100" id="navbarNav">
                    <ul className="navbar-nav flex-column w-100">
                        <li className="nav-item" onClick={() => HandleChoose(0)} style={choose == 0 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Dashboard</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(1)} style={choose == 1 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Khách hàng</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(2)} style={choose == 2 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Danh mục</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(3)} style={choose == 3 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Sản phẩm</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(4)} style={choose == 4 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Khuyến mãi</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(5)} style={choose == 5 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Kho hàng</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(6)} style={choose == 6 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Banner</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(7)} style={choose == 7 ? { backgroundColor: "#04D481" } : {}}>
                            <h6 className="text-white">Quản Lý Đơn hàng</h6>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default VerticalNavBar

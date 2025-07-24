import React from 'react'
import '../style/v.css'

const VerticalNavBar = ({ HandleChoose }) => {
    return (
        <div className='v-container'>
            <nav className="navbar navbar-expand-lg flex-column align-items-start sidebar">

                <div className='v-nav-header'>

                    <div className='h-1 sub-header'>
                        <div className='logo'></div>
                        <h5>Admin</h5>
                    </div>

                    <div className='h-2 sub-header'>
                        <div className='avatar'></div>
                        <h5>Arkzero1235</h5>
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
                        <li className="nav-item" onClick={() => HandleChoose(0)}>
                            <h6 className="text-white">Dashboard</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(1)}>
                            <h6 className="text-white">QL Khách hàng</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(2)}>
                            <h6 className="text-white">QL Danh mục</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(3)}>
                            <h6 className="text-white">QL Sản phẩm</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(4)}>
                            <h6 className="text-white">QL Khuyến mãi</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(5)}>
                            <h6 className="text-white">QL Kho hàng</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(6)}>
                            <h6 className="text-white">QL Banner</h6>
                        </li>
                        <li className="nav-item" onClick={() => HandleChoose(7)}>
                            <h6 className="text-white">QL Đơn hàng</h6>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default VerticalNavBar

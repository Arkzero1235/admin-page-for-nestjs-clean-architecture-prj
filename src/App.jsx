import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import HorizonalNavBar from './components/HorizonalNavBar'
import VerticalNavBar from './components/VerticalNavBar'
import CustomerManage from './pages/CustomerManage';
import CategoryManage from './pages/CategoryManage';
import ProductManage from './pages/ProductManage';
import SaleManage from './pages/SaleManage';
import StorageManage from './pages/StorageManage';
import BannerManage from './pages/BannerManage';
import OrderManage from './pages/OrderManage';
import DashBoard from './pages/DashBoard';

function App() {
  const options = [0, 1, 2, 3, 4, 5, 6, 7];

  const [choose, setChoose] = useState(0);

  function HandleChoose(status) {
    setChoose(status)
  }

  return (
    <div className='app-container'>
      <VerticalNavBar HandleChoose={HandleChoose} />

      <div className='app-workplace'>

        <div className='main-workplace'>
          {choose === 0 && <DashBoard />}

          {choose === 1 && <CustomerManage />}

          {choose === 2 && <CategoryManage />}

          {choose === 3 && <ProductManage />}

          {choose === 4 && <SaleManage />}

          {choose === 5 && <StorageManage />}

          {choose === 6 && < BannerManage />}

          {choose === 7 && <OrderManage />}
        </div>

        <HorizonalNavBar />

      </div>

      <ToastContainer position="bottom-right" autoClose={1000} />

    </div>
  )
}

export default App

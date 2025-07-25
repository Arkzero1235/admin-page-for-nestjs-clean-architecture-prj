import { useState, useEffect, useCallback } from 'react'
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
import Login from './pages/Login';
import axios from 'axios';
import { toast } from 'react-toastify'

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const options = [0, 1, 2, 3, 4, 5, 6, 7];
  const titles = ['Quản Lý Khách hàng', 'Quản Lý Danh mục', 'Quản Lý Sản phẩm', 'Quản Lý Khuyến mãi', 'Quản Lý Kho hàng', 'Quản Lý Banner', 'Quản Lý Đơn hàng']

  const [isLogin, setIsLogin] = useState(false);

  const [choose, setChoose] = useState(0);
  const [title, setTitle] = useState('');
  const accessToken = localStorage.getItem("accessToken");

  const [revenueData, setRevenueData] = useState([]);
  const [sumData, setSumData] = useState({})

  function HandleSetSumData(data) {
    setSumData(data);
  }

  function HandleSetRevenue(data) {
    setRevenueData(data);
  }

  function HandleChoose(status) {
    setChoose(status)
  }

  function HandleSetTitle(choose) {
    if (choose >= 1 && choose <= 7) {
      setTitle(titles[choose - 1]);
    } else {
      setTitle('');
    }
  }

  function HandleLogin(status) {
    setIsLogin(status);
  }

  async function RenewToken() {
    try {
      const res = await axios.get(`${backendUrl}/auth/refresh-token`, { withCredentials: true });

      // console.log(res.data.data.accessToken);

      localStorage.setItem("accessToken", res.data.data.accessToken);

    } catch (error) {
      console.error(error);
    }
  }

  const CheckLogin = async () => {
    try {
      const res = await axios.post(`${backendUrl}/auth/profile`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });

      setIsLogin(true);

      RenewToken();

      toast.success("Kiểm tra đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Vui lòng đăng nhập lại");
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    HandleSetTitle(choose);
  }, [choose]);

  useEffect(() => {
    RenewToken()
    CheckLogin();
  }, []);

  return (
    <div className='app-container'>
      {
        isLogin ?
          <>
            <VerticalNavBar HandleChoose={HandleChoose} choose={choose} />

            <div className='app-workplace'>

              <div className='main-workplace'>
                {choose === 0 && <DashBoard
                  RenewToken={RenewToken}
                  revenueData={revenueData}
                  sumData={sumData}
                  HandleSetRevenue={HandleSetRevenue}
                  HandleSetSumData={HandleSetSumData}
                />}

                {choose === 1 && <CustomerManage RenewToken={RenewToken} />}

                {choose === 2 && <CategoryManage RenewToken={RenewToken} />}

                {choose === 3 && <ProductManage RenewToken={RenewToken} />}

                {choose === 4 && <SaleManage RenewToken={RenewToken} />}

                {choose === 5 && <StorageManage RenewToken={RenewToken} />}

                {choose === 6 && < BannerManage RenewToken={RenewToken} />}

                {choose === 7 && <OrderManage RenewToken={RenewToken} />}
              </div>

              <HorizonalNavBar title={title} HandleLogin={HandleLogin} />

            </div>

          </>
          :
          <Login HandleLogin={HandleLogin} />
      }

      <ToastContainer position="bottom-right" autoClose={1000} />

    </div>
  )
}

export default App

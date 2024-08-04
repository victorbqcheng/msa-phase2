
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import React from 'react';
import { observer } from 'mobx-react-lite';
import LoginDlg from './components/LoginDlg';
import axios from 'axios';
import { apiUrl } from './Config';
import userStore from './store/userStore';
import Footer from './components/Footer';
import AxiosWrapper from './components/AxiosWrapper';
import { useToast } from './components/ToastProvider';

function App() {
  const navigate = useNavigate();
  const [openLoginDlg, setOpenLoginDlg] = React.useState(false);
  const location = useLocation();
  const {showToast} = useToast();

  const onClickRegister = () => {
    navigate('/register');
  };
  const onClickLogin = () => {
    setOpenLoginDlg(true);
  };
  const onClickUserProfile = () => {
    navigate(`/user/${userStore.user?.id}`);
  };
  const onClickLogout = () => {
    userStore.setUser(null);
    if (location.pathname !== '/posts')
      navigate('/posts');
  };

  const onLogin = async (username: string, password: string) => {
    
    const loginUrl = apiUrl + "account/login";
    try {
      const res = await axios.post(loginUrl, { username, password });

      if (res.status === 200) {
        res.data.token;
        setOpenLoginDlg(false);
        showToast("Login successfully");
        userStore.setUser(res.data);
        // navigate to home page
        if (location.pathname !== '/posts')
          navigate('/posts');
      }
    } catch (error: any) {
      // as type assertion
      showToast(error.response.data.error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AxiosWrapper />
      <ResponsiveAppBar
        userName={userStore.user?.userName}
        onClickRegister={onClickRegister}
        onClickLogin={onClickLogin}
        onClickUserProfile={onClickUserProfile}
        onClickLogout={onClickLogout} />

      <LoginDlg open={openLoginDlg} onClose={() => setOpenLoginDlg(false)} onLogin={onLogin} />

      <Box sx={{ flex: 1, display: 'flex' }}>

        <Outlet />

      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  )
}

export default observer(App)


import { Outlet, useNavigate } from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import React from 'react';
import { observer } from 'mobx-react-lite';
import GlobalMessage from './components/GlobalMessage';

function App() {
  const navigate = useNavigate();

  const onClickRegister = () => {
    navigate('/register');
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <GlobalMessage />

      <ResponsiveAppBar onClickRegister={onClickRegister} />
      <Box sx={{ flex: 1,  display:'flex' }}>

        <Outlet />

      </Box>
      {/* Footer */}
      <Box sx={{ flex: 0, borderTop: '1px solid #ccc', padding: 2, textAlign: 'center' }}>
        footer
      </Box>
    </Box>
  )
}

export default observer(App)

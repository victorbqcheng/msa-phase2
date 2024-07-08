
import { Link, Outlet } from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'

function App() {
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ResponsiveAppBar />
        <div >
          <Outlet />
        </div>
        
      <div>footer</div>
    </Box>
  )
}

export default App


import { Outlet } from 'react-router-dom'
import './App.css'
import { Box } from '@mui/material'
import ResponsiveAppBar from './components/ResponsiveAppBar'

function App() {


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ResponsiveAppBar />
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

export default App


import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  

  return (
    <>
      <div>header</div>

        <Outlet />
      <div>footer</div>
    </>
  )
}

export default App

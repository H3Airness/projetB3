import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './composants/Menu'

function App() {

  return (
    <div className="page">
      <Menu />
      <div className="container">
        <Outlet />
      </div>

    </div>
  )
}

export default App

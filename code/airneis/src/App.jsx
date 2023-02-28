import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './composants/Menu'

function App() {

  return (<>
    <Menu/>
    <div className="page">
      <Outlet />
    </div>
    </>
  )
}

export default App

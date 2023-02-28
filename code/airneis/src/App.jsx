import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './composants/Menu'

function App() {

  return (<>
    <div className="page">
      <Menu />
        <Outlet />
    </div>
    </>
  )
}

export default App

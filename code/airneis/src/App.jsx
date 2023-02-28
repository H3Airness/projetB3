import { Outlet } from 'react-router-dom'
import './App.css'

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

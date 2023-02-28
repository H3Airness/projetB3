import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (<>
    <Menu/>
    <div className="page">
      <Menu />
      <div className="container">
        <Outlet />
      </div>

    </div>
    </>
  )
}

export default App

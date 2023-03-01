import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './composants/Footer'

function App() {

  return (<>
    <div>
        <Outlet />
    </div>
    <div className="sticky-bottom nav-bg">
        <Footer/>
    </div>
    </>
  )
}

export default App

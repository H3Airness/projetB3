import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './composants/Footer'

function App() {

  return (<>
    <div>
        <Outlet />
    </div>
    <div className="sticky-bottom">
        <Footer/>
    </div>
    </>
  )
}

export default App

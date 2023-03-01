import { Outlet } from 'react-router-dom'
import './App.css'
import Menu from './composants/Menu'
import Footer from './composants/Footer'

function App() {

  return (<>
    <div className="page">
      <Menu />
        <Outlet />
    </div>
    <div class="sticky-bottom">
        <Footer/>
    </div>
    </>
  )
}

export default App

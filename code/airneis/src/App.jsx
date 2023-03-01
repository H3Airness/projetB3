import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './composants/Footer'

function App() {

  return (<>
    <div className="page">
      <Outlet />
    </div>
    <div class="sticky-bottom">
        <Footer/>
    </div>
    </>
  )
}

export default App

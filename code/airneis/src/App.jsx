import { Outlet } from 'react-router-dom'
import './App.css'
import { DataContextProvider } from "./composants/context/dataContext";
import Footer from './composants/Footer'

function App() {

  return (<>
      <DataContextProvider>
        <Outlet />
      </DataContextProvider>
      <div className="Min-heightConteiner-footer"></div>
      <Footer/>
    </>
  )
}

export default App
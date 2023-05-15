import { Outlet } from 'react-router-dom'
import './App.css'
import { DataContextProvider } from "./composants/context/dataContext";
import Footer from './composants/Footer'
import Menu from './composants/Menu';

function App() {

  return (<>
      <DataContextProvider>
        <Menu />
        <Outlet />
      </DataContextProvider>
      <div className="Min-heightConteiner-footer"></div>
      <Footer/>
    </>
  )
}

export default App
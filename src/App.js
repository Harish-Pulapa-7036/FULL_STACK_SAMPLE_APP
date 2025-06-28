import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Payment from './pages/Payment';
import ProfileSettings from './pages/Profile';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/NavBar'
import GuestRoute from './components/GuestRoute';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      

        <Routes>
          
          <Route path='/login' element={<GuestRoute><div className='page-container centered-layout'><Login/></div></GuestRoute>}/>
          <Route path='/signup' element={<GuestRoute><div className='page-container centered-layout'><SignUp/></div></GuestRoute>}/>
          <Route path='/' element={<ProtectedRoute><div className='page-container'><Dashboard/></div></ProtectedRoute>}/>
          <Route path='/payment' element={<ProtectedRoute><div className='page-container '><Payment/></div></ProtectedRoute>}/>
          <Route path='/profile-settings' element={<ProtectedRoute><div className='page-container centered-layout'><ProfileSettings/></div></ProtectedRoute>}/>
          <Route path='*' element={<h1>Page Not Found</h1>}/>

        </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;

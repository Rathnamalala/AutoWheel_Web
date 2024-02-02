import {BrowserRouter , Routes, Route,} from 'react-router-dom';
import About from './pages/About';
import Signin from './pages/Signin';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
  return (
  <BrowserRouter>
    <Header/>
    <Routes> 
      <Route path="/" element={<Home />}/>  
      <Route path="/Admin" element={<Admin />}/>
      <Route path="/sign-in" element={<Signin />}/>  
      <Route path="/sign-up" element={<SignUp />}/>  
        
      <Route path="/about" element={<About />}/> 
      <Route element={<PrivateRoute/>} >
        <Route path="/profile" element={<Profile />}/> 
      </Route>
      
    </Routes>
  </BrowserRouter>
  
  
  
)}

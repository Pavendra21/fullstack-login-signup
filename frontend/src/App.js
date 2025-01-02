import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App() {
 
  return (
     <>
     <Router>
<Routes>

<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login />}/>
<Route path='/home' element={<Home />}/>
<Route path='/profile' element={<Profile />}/>
 
 
</Routes>
     </Router>
     
     </>
  );
}

export default App;

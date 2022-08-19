import logo from './logo.svg';
import './App.css';
import Home from './page/Home';
import {Routes,Route} from 'react-router-dom'
import Login from './component/Login';
import Signup from './component/signup';
function App() {
  return (
   <>
  <Routes>
    <Route path="/" element={ <Home/>}/>
    <Route path="/login" element={ <Login/>}/>
    <Route path="/signup" element={ <Signup/>}/>
  </Routes>
   </>
  );
}

export default App;

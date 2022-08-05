import Login from './components/login.js';
import Signup from './components/signup.js';
import Ticket from './components/ticket.js';
import {Link,Routes,Route,BrowserRouter} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='/' element={<Ticket/>}>
        </Route>
      </Routes>
  
      </BrowserRouter>
    </div>
  );
}

export default App;

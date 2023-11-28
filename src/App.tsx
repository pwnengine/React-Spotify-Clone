import { useProvider} from './context/StateProvier'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const {token, set_token } = useProvider();
  
  useEffect(() => {
    const hash = window.location.hash;
    if(hash.length > 10) {
      const token = hash.slice(1).split('=')[1].split('&')[0];
      set_token(token);
    }
  }, []);

  return (
        <BrowserRouter>
         
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home token={token} />} />
          </Routes>
          <div></div>
        </BrowserRouter>
    
  )
}

export default App

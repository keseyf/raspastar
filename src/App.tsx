import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import NotFound from './pages/notFound';
import Game from './pages/Game';
import ProfilePage from './pages/Profile';
import About from './pages/about';
import { useEffect } from 'react';
import { desabilitarCliqueDireito, bloquearAtalhos } from './controllers/blockDevTools';

function App() {

    // useEffect(() => {
    //     window.addEventListener("contextmenu", desabilitarCliqueDireito, { passive: false });
    //     window.addEventListener("keydown", bloquearAtalhos, { passive: false });
    //     return () => {
    //         window.removeEventListener("contextmenu", desabilitarCliqueDireito);
    //         window.removeEventListener("keydown", bloquearAtalhos);
    //     }
    // }, [])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/games/:id' element={<Game/>}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/sobre" element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

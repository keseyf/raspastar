import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import NotFound from './pages/notFound';
import Game from './pages/Game';
import ProfilePage from './pages/Profile';
import About from './pages/about';

function App() {

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

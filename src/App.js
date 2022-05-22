import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from './views/HomeView';
import LoginView from "./views/LoginView";
import NavBar from "./components/NavBar/NavBar";
import HiraganaPracticeView from "./views/HiraganaPracticeView";
import KatakanaPracticView from "./views/KatakanaPracticeView";

const App = () => {
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/hiragana" element={<HiraganaPracticeView/>} />
        <Route path="/katakana" element={<KatakanaPracticView/>} />
      </Routes>
    </Router>
  );
}

export default App;
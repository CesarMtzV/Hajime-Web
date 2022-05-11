import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from './views/HomeView';
import LoginView from "./views/LoginView";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;
 
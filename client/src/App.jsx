import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import AppRoutes from "./components/AppRoutes.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {

  return (
    <Router>
        <div className="app">
            <h1>React on Rails Blog</h1>
            <NavBar />
            <AppRoutes />
        </div>
    </ Router>
  )
}

export default App

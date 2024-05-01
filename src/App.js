import './App.css';
import {Routes, Route} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import {ToastContainer} from "react-toastify";
function App() {
  return (
      <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
      </div>
  );
}

export default App;

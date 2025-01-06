import './App.css'
import { Routes, Route } from "react-router";
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Chat from './Pages/Chat';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    
    </>
  )
}

export default App

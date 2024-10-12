import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from "./components/ChatPage/ChatPage";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/Homepage";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/chat' element={<ChatPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
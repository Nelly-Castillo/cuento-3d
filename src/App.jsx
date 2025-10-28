import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/header";
import Home from './pages/Home';       
import Books from './pages/Books';    
import Help from './pages/Help';  
import Story from './pages/Story';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/books" element={<Books />}/>
      <Route path="/story/:id" element={<Story />}/>
      <Route path="/help" element={<Help/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

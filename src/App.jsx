import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import NavBar from "./components/Header";
import Home from './pages/Home';       
import Books from './pages/Books';    
import Help from './pages/Help';  
import Story from './pages/Story';

function App() {
  const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/cuentos.json')
        .then(res => res.json())
        .then(data => {
            const booksArray = Array.isArray(data) ? data : [data]; 
            setAllBooks(booksArray);
            setFilteredBooks(booksArray);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const handleSearch = (query) => {
        if (!query.trim()) {
            setFilteredBooks(allBooks);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = allBooks.filter(book => {
            if (!book) return false;
            return (book.titulo?.toLowerCase().includes(lowerQuery) ||
                    book.autor?.toLowerCase().includes(lowerQuery));
        });

        setFilteredBooks(results);
    };

    if (loading){
      return (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-row gap-2">
              <div className="w-4 h-4 rounded-full bg-[#0D0630] animate-bounce [animation-delay:.7s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#18314F] animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-[#384E77] animate-bounce [animation-delay:.7s]"></div>
            </div>
          </div>
      )
        
      
    } 
  return (
    <BrowserRouter>
      <NavBar onSearch={handleSearch}/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/books" element={<Books loading={loading} filteredBooks={filteredBooks} />}/>
      <Route path="/story/:id" element={<Story />}/>
      <Route path="/help" element={<Help/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

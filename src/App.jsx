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
      return <h1 className="pt-20 text-center">Cargando aplicación...</h1>;
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

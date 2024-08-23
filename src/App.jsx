import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
  ]);

  const addBook = (title, author) => {
    setBooks([...books, { id: books.length + 1, title, author }]);
  };

  const updateBook = (id, title, author) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, title, author } : book
      )
    );
  };

  const deleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/add">Add Book</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/books"
            element={<BookList books={books} deleteBook={deleteBook} />}
          />
          <Route path="/add" element={<AddBook addBook={addBook} />} />
          <Route
            path="/edit/:id"
            element={<EditBook books={books} updateBook={updateBook} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

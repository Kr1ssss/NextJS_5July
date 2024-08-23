import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook({ books, updateBook }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const book = books.find((book) => book.id === parseInt(id));
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    } else {
      alert('Book not found');
      navigate('/books');
    }
  }, [id, books, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      updateBook(parseInt(id), title, author);
      navigate('/books');
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;

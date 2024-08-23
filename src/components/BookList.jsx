import React from 'react';
import { Link } from 'react-router-dom';

function BookList({ books, deleteBook }) {
  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <Link to={`/edit/${book.id}`}>Edit</Link>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;

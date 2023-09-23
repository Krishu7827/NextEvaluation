
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function MyBooks() {
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState('All'); // Default filter value
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order

  useEffect(() => {
    // Fetch all books
    async function fetchBooks() {
      try {
        const response = await axios.get('https://glorious-tuna-sweatshirt.cyclic.cloud/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Handle error, show error message, etc.
      }
    }
    fetchBooks();
  }, []);

  const handleFilterChange = async (e) => {
    const selectedGenre = e.target.value;
    setGenreFilter(selectedGenre);
    try {
      const response = await axios.get(`https://glorious-tuna-sweatshirt.cyclic.cloud/api/books/filter?genre=${selectedGenre}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error filtering books:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleSortChange = async (e) => {
    const selectedOrder = e.target.value;
    setSortOrder(selectedOrder);
    try {
      const response = await axios.get(`https://glorious-tuna-sweatshirt.cyclic.cloud/api/books/sort?order=${selectedOrder}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error sorting books:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`https://glorious-tuna-sweatshirt.cyclic.cloud/api/books/${id}`);
      // Update the book list after deletion
      const updatedBooks = books.filter((book) => book._id !== id);
      alert("Deleted Succesfully")
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>My Books</h2>
      <div>
        <label>Filter by Genre:</label>
        <select value={genreFilter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Comic">Comic</option>
        </select>
      </div>
      <div>
        <label>Sort by Price:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author}<br />
            <strong>Genre:</strong> {book.genre}<br />
            <strong>Description:</strong> {book.description}<br />
            <strong>Price:</strong> ${book.price}<br />
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyBooks;

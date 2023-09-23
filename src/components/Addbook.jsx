
import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction', // Default genre
    description: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://glorious-tuna-sweatshirt.cyclic.cloud/api/books', formData);
      // Clear form fields after submission

      alert("added succesfully")
      window.location.reload();
      setFormData({
        title: '',
        author: '',
        genre: 'Fiction',
        description: '',
        price: '',
      });

    } catch (error) {
      console.error('Error adding book:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div>
          <label>Genre:</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Comic">Comic</option>
          </select>
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;

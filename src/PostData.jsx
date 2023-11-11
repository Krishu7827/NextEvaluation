// PostData.js
import React, { useState } from 'react';

const PostData = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: 'India',
    travelers: 1,
    budgetPerPerson: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://different-tick-overalls.cyclic.app/api/travel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
      
        console.log('Data posted successfully');
      } else {
     
        console.error('Error posting data:', response.statusText);
      }
    } catch (error) {
     
      console.error('Network error:', error.message);
    }

    
    setFormData({
      name: '',
      email: '',
      destination: 'India',
      travelers: 1,
      budgetPerPerson: 0,
    });
  };

  return (
    <div className="container post-data-container">
      <h2>Post Data</h2>
      <form className="post-data-form"  onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Destination:
          <select name="destination" value={formData.destination} onChange={handleChange}>
            <option value="India">India</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
          </select>
        </label>
        <br />
        <label>
          No. of Travelers:
          <input type="number" name="travelers" value={formData.travelers} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Budget Per Person:
          <input type="number" name="budgetPerPerson" value={formData.budgetPerPerson} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostData;

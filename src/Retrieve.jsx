// RetrieveData.js
import React, { useState, useEffect } from 'react';

const RetrieveData = () => {
  const [travelData, setTravelData] = useState([]);
  const [filteredDestination, setFilteredDestination] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  // Fetch data from the backend API on component mount
  useEffect(() => {
   
    const fetchData = async () => {
      try {
       
       
      
        if (filteredDestination && sortOrder) {
           let  apiUrl = `https://different-tick-overalls.cyclic.app/api/travels/filterAndSort?destination=${filteredDestination}&order=${sortOrder}`;
         
             const response = await fetch(apiUrl);
             if (response.ok) {
               const data = await response.json();
               setTravelData(data);
             } else {
               console.error('Error fetching data:', response.statusText);
             }
        }else{
            let apiUrl = "https://different-tick-overalls.cyclic.app/api/travels/"
            const response = await fetch(apiUrl);
            if (response.ok) {
              const data = await response.json();
              setTravelData(data);
            } else {
              console.error('Error fetching data:', response.statusText);
            }
        }

     
      
      } catch (error) {
        console.error('Network error:', error.message);
      }
    };

    fetchData();
  }, [filteredDestination, sortOrder]);



  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://different-tick-overalls.cyclic.app/api/travel/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
     
        setTravelData((prevData) => prevData.filter((item) => item._id !== id));
        console.log('Data deleted successfully');
      } else {
        console.error('Error deleting data:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const handleFilter = (destination) => {
    setFilteredDestination(destination);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container retrieve-data-container">
      <h2>Retrieve Data</h2>
      <div>
        {/* Filter by Destination */}
        <label>
          Filter by Destination:
          <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="">All</option>
            <option value="India">India</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
          </select>
        </label>

        {/* Sort Order */}
        <label>
          Sort Order:
          <select onChange={handleSort}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {travelData.map((travel) => (
        <div key={travel._id}>
          <p>Name: {travel.name}</p>
          <p>Email: {travel.email}</p>
          <p>Destination: {travel.destination}</p>
          <p>No. of Travelers: {travel.travelers}</p>
          <p>Budget Per Person: {travel.budgetPerPerson}</p>
          <button className="delete-button" onClick={() => handleDelete(travel._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RetrieveData;

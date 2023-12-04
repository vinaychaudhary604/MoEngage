import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrewerySearch = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    name: '',
    type: ''
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search`, { params: searchParams });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error.response.data);
      // Handle error (show message, etc.)
    }
  };

  return (
    <div>
      <h2>Search Breweries</h2>
      <form onSubmit={handleSearch}>
        <label>City:
          <input type="text" value={searchParams.city} onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })} />
        </label>
        <label>Name:
          <input type="text" value={searchParams.name} onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })} />
        </label>
        <label>Type:
          <input type="text" value={searchParams.type} onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })} />
        </label>
        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map((brewery) => (
          <li key={brewery.id}>
            <h3>{brewery.name}</h3>
            <p>Address: {brewery.address}</p>
            <p>Phone: {brewery.phone}</p>
            <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <p>Current Rating: {brewery.current_rating}</p>
            <p>State: {brewery.state}</p>
            <p>City: {brewery.city}</p>
            <Link to={`/brewery/${brewery.id}`}>See Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrewerySearch;

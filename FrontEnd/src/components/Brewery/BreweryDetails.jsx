import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const BreweryDetails = ({ match }) => {
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBreweryDetails = async () => {
      try {
        const response = await axios.get(`/api/brewery/${match.params.id}`);
        setBrewery(response.data.brewery);
      } catch (error) {
        console.error(error.response.data);
        // Handle error (show message, etc.)
      }
    };

    fetchBreweryDetails();
  }, [match.params.id]);

  return (
    <div>
      {brewery ? (
        <div>
          <h2>{brewery.name}</h2>
          <p>Address: {brewery.address}</p>
          <p>Phone: {brewery.phone}</p>
          <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
          <p>Current Rating: {brewery.current_rating}</p>
          <p>State: {brewery.state}</p>
          <p>City: {brewery.city}</p>

          <h3>Reviews</h3>
          {brewery.reviews && brewery.reviews.length > 0 ? (
            <ul>
              {brewery.reviews.map((review) => (
                <li key={review._id}>
                  <p>Rating: {review.rating}</p>
                  <p>Description: {review.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet. Be the first to add a review!</p>
          )}

          <ReviewForm breweryId={match.params.id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BreweryDetails;

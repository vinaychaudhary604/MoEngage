import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ breweryId }) => {
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/brewery/${breweryId}/add-review`, { rating, description });
      // Optionally, you can fetch and update the reviews list after submitting the review
    } catch (error) {
      console.error(error.response.data);
      // Handle error (show message, etc.)
    }
  };

  return (
    <div>
      <h3>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <label>Rating:
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <label>Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;

'use client';
import { useState, FormEvent } from 'react';

const BookingForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {submitted ? (
        <>
          <p>
            Thank you for registering! We will send you a confirmation email
            shortly.
          </p>
        </>
      ) : (
        <div id="book-event">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="button-submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default BookingForm;

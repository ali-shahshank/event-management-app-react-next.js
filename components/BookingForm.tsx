'use client';

import { useState, FormEvent } from 'react';
import { createBooking } from '@/lib/actions/booking.actions';
import posthog from 'posthog-js';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const BookingForm = ({ eventId }: { eventId: string }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const result = await createBooking({ eventId, email });

    if (result.success) {
      setStatus('success');
      posthog.capture('event booked', { eventId, email });
    } else {
      setStatus('error');
      setErrorMessage(result.error);
      posthog.captureException(Error);
    }
  };

  if (status === 'success') {
    return (
      <p>
        Thank you for registering! We will send you a confirmation email
        shortly.
      </p>
    );
  }

  return (
    <div id="book-event">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          className="button-submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
        {status === 'error' && (
          <p
            role="alert"
            className="text-red-500 text-sm mt-2"
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;

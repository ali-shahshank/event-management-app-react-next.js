## Full-stack Event Management App (Next.js + TailwindCSS)

A full-stack event management starter built with Next.js 16, MongoDB, and Cloudinary. Browse, book, and discover developer events — hackathons, meetups, and conferences — all in one place.

## Stack

Framework - Next.js 16 (App Router, Turbopack, Cache Components)
Language - TypeScript
Styling - Tailwind CSS v4
Database - MongoDB via Mongoose
Media - Cloudinary
Analytics - Posthog

## Features

Browse developer events with a responsive, accessible UI (WCAG 2.0 AA)
Event detail pages with agenda, tags, organizer info, and similar-event recommendations
Event registration via a booking form with duplicate-entry protection
Image uploads handled through Cloudinary
Server-side data caching (use cache) with per-function cache lifetimes
Streaming UI via React Suspense with custom loading and not-found states
PostHog analytics integration

## Updates

Future updates: Create new events and authentication.

## Project Structure

app/
page.tsx # Home - event listing
events/[slug]/ # Event details, loading, not-found
api/events/ # REST routes (POST with Cloudinary upload, GET)
api/events/[slug]/ # GET by slug
components/ # EventCard, BookingForm, carousels, etc.
database/ # Mongoose schemas (Event, Booking)
lib/
actions/ # Server Actions & cached data functions
mongodb.ts # Connection singleton
scripts/ # Seed & one-off data-fix scripts

## Getting started

git clone https://github.com/ali-shahshank/event-management-app-react-next.js
cd event-management-app-next.js
npm install

crate .env.local

npm run dev

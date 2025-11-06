# Resume Frontend

A React + Vite frontend application that displays "Hello from frontend" and fetches a message from the backend API.

## Requirements

- Node.js 20+
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Docker

### Build Docker Image

```bash
docker build -t resume-frontend .
```

### Run Docker Container

```bash
docker run -p 8080:80 resume-frontend
```

The app will be available at `http://localhost:8080`

## Features

- Displays "Hello from frontend"
- Fetches message from backend API at `https://resume-backend-production-12d4.up.railway.app/`
- Shows "Loading…" while fetching
- Displays backend message below the frontend message

## Tech Stack

- React 18
- Vite
- Nginx (for production Docker image)


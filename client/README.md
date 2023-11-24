# Bliro Full Stack Intern Challenge - Frontend

## Project Overview

This repository contains the frontend part of the Bliro Full Stack Intern Challenge. It provides a user interface for managing meetings, including features for creating, updating, and deleting meetings.

## Tasks

### Meeting Details View

Implement a new component `meetingDetails.tsx` that:

- Displays all details of a meeting when a meeting in the list is clicked.
- Allows editing and deleting the meeting using the new API endpoints.

### Create Meeting Form

Develop a form to add new meetings, including title, start date, end date, description, and participants. Validate inputs on the client side.

### Global State Management

Set up a simple global state management (Context API or Redux) to manage and update the meetings list across components.

## Additional Features

Extend the application with the following additional feature:

- **Filter and Sort Meetings:**
  Implement the ability to filter and sort meetings based on various criteria such as title, date, and the number of participants.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/vinit717/bliro_fullstack_intern_challenge
   cd client

## Install Volta (if not already installed)

- Follow the instructions on the <https://volta.sh/> to install Volta, a JavaScript runtime manager.

- Set Node.js version using Volta

   ```bash
    volta pin node@<supported node version>

- for this project Node.js (version v18.18.2)

Your Next.js client will start on <http://localhost:3001> by default.

## Environment Variables
create a new file named `.env` and add this.

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api/meetings"
```

## Install Dependencies

Execute the following command to install the required npm packages:

```bash
npm install
```

## Run the Development Server

To run the client in development mode with hot-reloading:

```bash
npm run dev
```

## Build and Start for Production

To build the application for production usage:

```bash
npm run build
```

## Testing

```bash
npm run test
```

## Troubleshooting

If npm packages are causing issues, delete the node_modules folder and package-lock.json file and reinstall the dependencies with npm install.
Ensure that .env.local is included in your .gitignore to prevent committing sensitive environment data to version control.

# **Spartificial Frontend Assignment Reference document**

### 1. **Project Setup**

- **Create React App**: Use `create-react-app` to set up a new React project.
- **Directory Structure**: Organize the project directory with folders for components, pages, assets, and services.

### 2. **Dependencies**

- **Install Dependencies**: Install necessary dependencies like React Router for routing, Axios for API calls, and a UI library like Material-UI or Bootstrap for styling.
- **Dummy Data**: Create a dummy dataset for users and posts. This can be done using a JSON file or a simple JavaScript array.

### 3. **Routing**

- **React Router Setup**: Set up React Router for navigation between pages (Home, User Listing, Post Listing).
- **Navigation Bar**: Create a sidebar navigation component that links to the Home, User Listing, and Post Listing pages.

### 4. **Home Page**

- **KPIs Display**: Create a Home page component that displays four KPIs: Total Users, Total Posts, Users Active in the Last 24 Hours, and Posts Published in the Last 24 Hours. Use dummy data to calculate and display these metrics.

### 5. **User Listing Page**

- **KPI Boxes**: Display two KPI boxes at the top for Total Users and Users Active in the Last 24 Hours.
- **Table for Users**: Create a table to list users with columns for User ID, Username, Name, and Email.
- **Pagination**: Implement pagination to navigate through the list of users.
- **Control Buttons**: Add Edit and Ban buttons for each user in the table.

### 6. **Post Listing Page**

- **KPI Boxes**: Display two KPI boxes at the top for Total Posts and Posts Published in the Last 24 Hours.
- **Table for Posts**: Create a table to list posts with columns for Post ID, Post Caption, and Media URL.
- **Pagination**: Implement pagination to navigate through the list of posts.
- **Control Buttons**: Add Delete and Hide buttons for each post in the table.

### 7. **Authentication**

- **Dummy Login Page**: Create a simple login page with email and password fields. This can be a standalone component that routes to the main dashboard upon successful login with any credentials.
- **Your backend is already mostly implemented. Below are the required APIs:**

-POST /register: Handles user registration with password hashing.
-POST /login: Authenticates the user and returns a JWT token.
-GET /getUser: Fetches all users (protected route).
-PUT /edit: Edits user details (protected route).
-DELETE /deleteUser/:id: Deletes a user by ID (protected route).

### 8. **State Management**

- **State Management**: Use React's `useState` and `useEffect` hooks to manage the state of the application. Optionally, consider using a state management library like Redux for better state handling, especially if the application scales.

### Overview
This project is an admin dashboard built with React.js and Express.js. It allows administrators to manage users and posts with various controls.
## Features
- User Registration and Login
- JWT Authentication
- User and Post Management (CRUD operations)
- KPI Display (Total Users, Total Posts, etc.)
- Pagination and Navigation

## Tech Stack
- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT

## Setup

### Prerequisites
- Node.js
- MySQL

### Installation
1. Clone the repository.
2. Navigate to the project directory.

### bash commands
-cd my-react-dashboard
-Install frontend dependencies.
-npm install
--Navigate to the backend directory and install backend dependencies.

-cd server
-npm install
-Start the backend server.
-node index.js
-Start the frontend server.
### Access the dashboard at http://localhost:5173.

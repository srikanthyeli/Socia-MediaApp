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

### 8. **State Management**

- **State Management**: Use React's `useState` and `useEffect` hooks to manage the state of the application. Optionally, consider using a state management library like Redux for better state handling, especially if the application scales.

### 9.Git hub link 

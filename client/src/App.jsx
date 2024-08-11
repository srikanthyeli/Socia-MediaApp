import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Users from "./Components/Users";
import Posts from "./Components/Posts";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/users",
    element: (
      <div>
        <Users />
      </div>
    ),
  },
  {
    path: "/post",
    element: (
      <div>
        <Posts />
      </div>
    ),
  },
]);
const App = () => {
  

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

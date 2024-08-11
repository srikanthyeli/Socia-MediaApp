import React, { useState, useEffect } from "react";
import Navigation from "../Navigation";
import Cookies from "js-cookie";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Users = () => {
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
    data: null,
    errorMsg: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    const getData = async () => {
      setApiResponse({
        status: apiStatusConstants.inProgress,
        data: null,
        errorMsg: null,
        activeUser:false,
      });

      const url = "http://localhost:3002/getUser";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (response.ok === true) {
          setApiResponse({
            status: apiStatusConstants.success,
            data: responseData,
            errorMsg: null,
          });
          console.log("Success");
        } else {
          setApiResponse({
            status: apiStatusConstants.failure,
            data: null,
            errorMsg: responseData.error_msg || "Something went wrong",
          });
        }
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: "Network error",
        });
      }
    };

    getData();
  }, [jwtToken]);

  const renderLoadingView = () => (
    <div className="loaderContainer">
      <h1>Loading.....</h1>
    </div>
  );

  const renderFailureView = () => <div>Error: {apiResponse.errorMsg}</div>;

  const renderSuccessView = () => {
    const { data } = apiResponse;
    const users = data || [];
    const totalPosts = users.length;
    const activeUsers = users.filter((user) => user.isActive).length;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleEdit = async (id) => {
      const url = "http://localhost:3002/edit";
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          Id: id,
          UserName: "Anand", 
          Email: "Anand@gmail.com", 
        }),
      };
  
      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
  
        if (response.ok) {
          console.log("User updated successfully", responseData);
          
        } else {
          console.log("Update failed", responseData.error_msg || "Something went wrong");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    const handleDelete = async (id) => {
      const url = `http://localhost:3002/deleteUser/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          setApiResponse((prevState) => ({
            ...prevState,
            data: prevState.data.filter((user) => user.id !== id),
          }));
          console.log("User deleted successfully");
        } else {
          const responseData = await response.json();
          setApiResponse({
            status: apiStatusConstants.failure,
            data: null,
            errorMsg: responseData.error_msg || "Something went wrong",
          });
        }
      } catch (error) {
        setApiResponse({
          status: apiStatusConstants.failure,
          data: null,
          errorMsg: "Network error",
        });
      }
    };

    return (
      <div className="homepage">
        <Navigation />
        <h1>User Listing</h1>
        <div className="kpi-container">
          <div className="box"><h1>Total Users: {totalPosts}</h1></div>
          <div className="box"><h1>Total Users: {totalPosts}</h1></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.userName.toUpperCase()}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} className="add-post">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="add-post">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    );
  };

  const renderUserList = () => {
    const { status } = apiResponse;

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return <div>{renderUserList()}</div>;
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active" : ""}>
            <a onClick={() => paginate(number)} href="#!">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Users;

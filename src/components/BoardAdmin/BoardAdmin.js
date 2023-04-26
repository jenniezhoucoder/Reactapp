import React from "react";
import AuthService from "../../services/auth.service";

const BoardAdmin = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>
          <strong>{currentUser.username}</strong> Profile
        </h1>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Phone:</strong>
      </p>
      <p>
        <strong>Order history:</strong>
      </p>
      <p>
        <strong>Shipping address:</strong>
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default BoardAdmin;

import React, { useState, useEffect } from "react";
import Product from "../Product/Product";

import UserService from "../../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      {/* <Product /> */}
    </div>
  );
};

export default Home;

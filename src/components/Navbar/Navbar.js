import React from "react";
import "./Navbar.css";

const Navbar = ({ updateCityName, search }) => {
  return (
    <div className="navbar">
      <nav>
        <form
          onSubmit={(e) => {
            search(e);
          }}
        >
          <input
            type="text"
            className="searchInput"
            placeholder="Search City"
            onChange={(e) => {
              updateCityName(e.target.value);
            }}
          />
        </form>
      </nav>
    </div>
  );
};

export default Navbar;

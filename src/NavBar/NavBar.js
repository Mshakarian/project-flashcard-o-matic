import React from "react";
import { Link } from "react-router-dom";

//this function takes in the object where each key is a page, and it's value sis the url

export default function NavBar({ navigation }) {
  //get entries of the nav object
  const navEntries = Object.entries(navigation);

  //map the entries

  const navLinks = navEntries.map((page, index) => {
    if (index < navEntries.length - 1) {
      return (
        <li className="breadcrumb-item" key={index}>
          <Link to={page[1]}>{page[0]}</Link>
        </li>
      );
    } else {
      return (
        <li className="breadcrumb-item active" key={index} aria-current="page">
          {page[0]}
        </li>
      );
    }
  });

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">{navLinks}</ol>
      </nav>
    </React.Fragment>
  );
}

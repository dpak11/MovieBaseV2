import { Link } from "react-router-dom";

const Nav = () => {
  
  return (
    <div className="nav-bar">
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/gallery">Gallery</Link>
      </p>
    </div>
  );
};

export default Nav;

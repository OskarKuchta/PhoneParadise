
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h2>Phone Paradise</h2>
      </Link>

      <div>
        <Link to="/about">Why us?</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

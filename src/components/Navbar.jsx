import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">Dosettes</div>
      <div className="navbar-links">
        <Link to="/">Nos dosettes</Link>
        <Link to="/panier">Panier</Link>
        <Link to="/admin">Administration</Link>
      </div>
    </nav>
  );
}

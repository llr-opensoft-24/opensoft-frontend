import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import flixpediaLogo from '../../assets/flixpedia.png';
import Styles from './header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.setItem('token', ''); 
    navigate('/login');
  };

  return (
    <header className={Styles.topNav}>
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          {/* Left section */}
          <div className="navbar-brand">
            <Link to="/">
              <img className={Styles.nav__logo} src={flixpediaLogo} alt="" />
            </Link>
          </div>

          {/* Center section */}
          <div className=" d-none d-md-block flex-grow-1">
            <form className="d-flex justify-content-center align-items-center">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "500px" }} 
              />
            </form>
          </div>

          {/* Right section */}
          <div className="d-flex">
            
            <div className="sign-in-button">
              <button className="btn btn-danger" onClick={clickLogout} >Logout</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;



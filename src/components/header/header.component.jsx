import { useNavigate, Link, useLocation } from "react-router-dom";
import flixpediaLogo from '../../assets/flixpedia.png';
import Styles from './header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return(
    <header className={Styles.topNav}>
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
        {location.pathname !== '/' && ( 
          <Link className="nav__logo" to="/">
            <img className={Styles.nav__logo} src={flixpediaLogo} alt="" />
          </Link>
          )}
          {location.pathname === '/' && ( 
            <div> </div>
          )}
        
          
          <div className="navbar">
            <form className="d-flex" role="search">
              {location.pathname !== '/login' && ( 
                <button className="btn btn-danger" onClick={clickHandler}>Sign In</button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;

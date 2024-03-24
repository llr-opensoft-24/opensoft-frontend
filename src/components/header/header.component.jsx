import { useNavigate, Link } from "react-router-dom";
import flixpediaLogo from '../../assets/flixpedia.png';
import Styles from './header.module.css';
const Header = () => {
  const navigate = useNavigate();

  const clickHandler = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  return(
    <header className={Styles.topNav}>
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <Link className="nav__logo" to="/">
            <img className={Styles.nav__logo} src={flixpediaLogo} alt="" />
          </Link>
          
          <div className="navbar">
            <form className="d-flex" role="search">
              <select>
                <option>English</option>
                <option>Hindi</option>
              </select>
              <button className="btn btn-danger" onClick={clickHandler}>Signin</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
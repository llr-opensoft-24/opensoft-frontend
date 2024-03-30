import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import flixpediaLogo from "../../assets/flixpedia.png";
import Styles from "./header.module.css";
import SearchResults from "./components/SearchResults";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const plan = localStorage.getItem("plan");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // [ {id: 1, title: "movie1"}, {id: 2, title: "movie2"}
  const clickLogout = (e) => {
    e.preventDefault();
    console.log("Hello");
    localStorage.setItem("token", "");
    localStorage.clear();
    navigate("/login");
  };
  const clickPlans = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  useEffect(() => {
    const getResponse = async () => {
      try {
        if (searchTerm.length > 1) {
          const response = await axios.get(`http://4.247.166.168/search?q=${searchTerm}`, {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          });
          if (response.data.data) {
            console.log(response.data.data);
            setSearchResults(response.data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getResponse();
  }, [searchTerm]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
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
          <div className=" d-none d-md-block flex-grow-1 px-4">
            <form className="d-flex justify-content-center align-items-center ">
              <input
                className="form-control position-relative"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={onSearch}
                style={{ width: "500px" }}
              />
              {searchTerm.length>=2 && <SearchResults searchResults={searchResults} />}

            </form>
          </div>
          {/* Right section */}

          <div className="d-flex">
            {plan === "free" && (
              <div className={Styles.plans}>
                <button className="btn btn-danger" onClick={clickPlans}>
                  Plans
                </button>
              </div>
            )}
            <div className="sign-in-button">
              <button className="btn btn-danger" onClick={clickLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

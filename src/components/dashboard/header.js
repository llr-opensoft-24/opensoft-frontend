import React, { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import SearchResults from "../header/components/SearchResults";
import axios from "axios";
import img from "../../assets/img.webp";
import { Link, useNavigate } from "react-router-dom";
import { useMovie } from "../../context/MovieContext";
import { useSearch } from "../../context/SearchContext";
import Navbar from "./component/Navbar";

const DashHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { isLoading: isMovieLoading, filmData } = useMovie();
  const { searchMovies, searchResults } = useSearch();
  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchTerm.length > 1) {
        searchMovies(searchTerm);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    window.location.href = "/login";
  };

  const clickPlans = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  return (
    <div className={Styles.background}>
      <Navbar/>
      <div className={Styles.container}>
        <div className={Styles.heading}>
          <div className={Styles.flix}>
            <p>
              <span className="flix">Flix</span>
              <span className={Styles.pedia}>Pedia</span>
            </p>
          </div>
          <div className={Styles.options}>
            <p className="mb-4">
              {" "}
              <span className="search">SEARCH</span>{" "}
              <span className="dash">|</span>{" "}
              <span className="discover">DISCOVER</span>
              <span className="dash">|</span>{" "}
              <span className="enjoy">ENJOY</span>
            </p>
          </div>
        </div>
        <div className={Styles.input_group}>
          <input
            className={`${Styles.form_control} ${Styles.searchInput} form-control px-4 position-relative`}
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={onSearch}
          />
          {searchTerm.length >= 2 && (
            <SearchResults searchResults={searchResults} />
          )}
        </div>
      </div>
      <div>
        <h1 className={Styles.m_heading}>Recommended Movies</h1>
        <div className={Styles.movie_page}>
          {!isMovieLoading ? (
            filmData.map((film, index) => (
              <div key={index} className={`${Styles.m_card}`}>
                <Link
                  to={`/poster?id=${film.imdb?.id}&type=p`}
                  className="text-decoration-none"
                >
                  <div className={Styles.m_card_inner}>
                    <img
                      src={film.poster ? film.poster : img}
                      className="poster-image"
                      alt={film.title}
                      width={200}
                      height={300}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = img;
                      }}
                    />
                  </div>
                  <div className={Styles.m_card_body}>
                    <h5 className={Styles.m_card_tits}>{film.title}&nbsp;({(film.plan).toUpperCase()})</h5>
                    <p className={Styles.m_card_text}>
                      {film.year} |{" "}
                      {film.languages?.map((language, index) => (
                        <span key={index}>
                          {film.languages.length > 1 && index >= 1 ? ", " : ""}
                          {language}
                        </span>
                      ))}{" "}
                      | {film.runtime}
                      {" mins"}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <span> Loading...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashHeader;

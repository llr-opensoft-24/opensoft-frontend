import React, { useEffect, useState } from "react";
import Styles from "./Dashboard.module.css";
import SearchResults from "../header/components/SearchResults";
import axios from "axios";
import img from "../../assets/img.webp";
import { Link } from "react-router-dom";

const DashHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filmData, setFilmData] = useState([]);
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await axios.get(`http://10.145.54.6:8080/movies`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.data && response.data.data) {
          setFilmData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllMovies();
  }, []);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const getResponse = async () => {
      try {
        if (searchTerm.length > 1) {
          const response = await axios.get(
            `http://10.145.54.6:8080/search?q=${searchTerm}`,
            {
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.data.data) {
            setSearchResults(response.data.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getResponse();
  }, [searchTerm]);

  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "");
    window.location.href = "/login";
  };
  return (
    <div className={Styles.background}>
      <div className="d-flex p-4 justify-content-end">
        <div className={Styles.plans}>
          <button className="btn btn-danger" onClick={clickLogout}>
            Plans
          </button>
        </div>

        <div className="sign-in-button ms-4">
          <button className="btn btn-danger" onClick={clickLogout}>
            Logout
          </button>
        </div>
      </div>
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
          {filmData.map((film, index) => (
            <div key={index} className={`${Styles.m_card}`}>
              <Link
                to={`/poster?id=${film.imdb?.id}`}
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
                  <h5 className={Styles.m_card_tits}>{film.title}</h5>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashHeader;

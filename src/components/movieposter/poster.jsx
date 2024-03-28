import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/img.webp";
import "./poster.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Poster = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === "") {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await axios.get(`http://10.145.80.49:8080/movies`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        if (response.data && response.data.data) {
          const movies = response.data.data;
          console.log(movies);
          setFilm(movies.find((movie) => movie.imdb.id == id));
          console.log(film);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllMovies();
    console.log(film ? film : "No film found");
  }, [id]);

  return (
    <>
      {film && (
        <div className="p_container">
          <div className="left">
            <div className="image">
              <img src={film?.poster ? film.poster : img} alt="img" />
            </div>
            <div className="btn">
              <button>
                <FontAwesomeIcon icon={faPlay} /> &nbsp;Watch Now
              </button>
            </div>
          </div>
          <div className="right">
            <h2 className="p_title">{film.title}</h2>
            <div className="year">
              <p>
                <span className="yr">{film.year}</span>
                <span>&nbsp; | &nbsp; </span>
                <span>
                  <FontAwesomeIcon icon={faClock} /> {film.runtime}{" "}
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span>
                  &nbsp;{" "}
                  {film.languages.map((language, index) => (
                    <span key={index}>
                      {film.languages.length > 1 && index >= 1 ? ", " : ""}
                      {language}
                    </span>
                  ))}{" "}
                  &nbsp;
                </span>
                <span>&nbsp;|&nbsp;</span>
                <span>
                  &nbsp; <FontAwesomeIcon icon={faStar} className="star" />{" "}
                  {film.imdb?.rating} &nbsp;
                </span>{" "}
              </p>
            </div>
            <p className="genere">{film.genre}</p>
            <div className="cast">
              <h3>Cast : &nbsp;</h3>
              <p>{film.cast}</p>
            </div>
            <div className="plot">
              <h3>Plot : &nbsp;</h3>
              <p>{film.plot}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Poster;

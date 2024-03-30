import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/img.webp";
import "./poster.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../../helpers/Image";
import { ArrowBack } from "@material-ui/icons";

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
      <div className="head" onClick={()=>{navigate(-1)}}>
        <ArrowBack className=" back-btn" />
      </div>
      {film && (
        <div className="p_container">
          <div className="p_content">
            <div className="left">
              {film.poster ? (
                <Image src={film.poster} className={"posterImg"} />
              ) : (
                <Image src={img} />
              )}
              <div className="btn">
                <button>
                  <FontAwesomeIcon icon={faPlay} /> &nbsp;Watch Now
                </button>
              </div>
            </div>
            <div className="right">
              <div className="p_title">
                {film.title} ({film.year})
              </div>
              <div className="tags">
                {film.genres
                  ? film.genres.map((genre) => {
                      return <span className="genre">{genre}</span>;
                    })
                  : null}
              </div>
              <div className="year">
                <p>
                  <span>
                    <FontAwesomeIcon icon={faClock} /> {film.runtime}
                    {" mins"}
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
              <div className="plot">
                <h3 className="title">Overview : </h3>
                <h6 className="content">{film.fullplot}</h6>
              </div>
              {film.cast ? (
                <div className="cast mt-3">
                  <h3 className="title">Cast : &nbsp;</h3>
                  <h5 className="cast_name">
                    {film.cast.map((name) => (
                      <span>
                        {name}
                        {" | "}
                      </span>
                    ))}
                  </h5>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Poster;

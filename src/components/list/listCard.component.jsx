import React, { useEffect } from "react";
// import styles from './list.module.css';
import { Link } from "react-router-dom";
import img from "../../assets/img.webp";
import Styles from "./list.module.css";
import axios from "axios";

const Movies = () => {
  const [filmData, setFilmData] = React.useState([]);
  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const response = await axios.get(`http://4.247.166.168/movies`, {
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
  return (
    <>
      <div className={Styles.m_container}>
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
    </>
  );
};

export default Movies;

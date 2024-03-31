import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faPlay } from "@fortawesome/free-solid-svg-icons";
import img from "../../assets/img.webp";
import { useLocation, useNavigate } from "react-router-dom";
import Image from "../../helpers/Image";
import { ArrowBack, PaymentRounded } from "@material-ui/icons";
import { useSearch } from "../../context/SearchContext";
import { useMovie } from "../../context/MovieContext";
import Styles from "./poster.module.css";
import Navbar from "../dashboard/component/Navbar";

const Poster = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const id = params.get("id");
  const type = params.get("type");
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();
  const { selectedMovie } = useSearch();
  const { filmData } = useMovie();
  const plan = localStorage.getItem("plan");

  useEffect(() => {
    if (localStorage.getItem("token") === "") {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const getMovie = async () => {
      try {
        if (type == "s") {
          await setFilm(selectedMovie);
          console.log(selectedMovie);
        } else if (type == "p") {
            filmData.find((m) => {
                console.log(m.imdb.id, id, m.imdb.id == id);
                return m.imdb.id == id;
            });
          await setFilm(filmData && filmData.find((m) => m.imdb.id == id));
          console.log(filmData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [id, filmData, selectedMovie]);

  const watchNowHandler=()=>{
    navigate(`/player?id=${film.imdb.id}`);
    console.log("player")
  }
  
  return (
    <>
      {film && (
        <div className={Styles.p_container}>
                <Navbar/>

          <div className={Styles.p_content}>
            <div className={Styles.left}>
              {film.poster ? (
                <Image src={film.poster} className={Styles.posterImg} />
              ) : (
                <Image src={img} />
              )}
            </div>
            <div className={Styles.right}>
              <div className={Styles.p_title}>
                {film.title} ({film.year})
              </div>
              <div className={Styles.tags}>
                {film.genres
                  ? film.genres.map((genre,index) => {
                      return <span key={index} className={Styles.genre}>{genre}</span>;
                    })
                  : null}
              </div>
              <div className={`mt-3 rounded-1 ${Styles.btn}`}>
                { (film.plan == "free" ||
                  (film.plan == "pro" && plan != "free") ||
                  (film.plan == "premium" && plan == "premium")) && (
                  <button onClick={watchNowHandler}>
                    <FontAwesomeIcon icon={faPlay}/> &nbsp;Watch Now
                  </button>
                )}
                {
                  (film.plan == "pro" && plan == "free") && (
                    <button onClick={()=>navigate('/payment')}>
                      <PaymentRounded/>&nbsp;Upgrade to Pro
                    </button>
                  )
                }
                {
                  (film.plan == "premium" && plan != "premium") && (
                    <button onClick={()=>navigate('/payment')}>
                      <PaymentRounded/>&nbsp;Upgrade to Premium
                    </button>
                  )
                }
              </div>
              <div className={Styles.year}>
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
                    &nbsp;{" "}
                    <FontAwesomeIcon icon={faStar} className={Styles.star} />{" "}
                    {film.imdb?.rating} &nbsp;
                  </span>{" "}
                </p>
              </div>
              <div className={Styles.plot}>
                <h3 className={Styles.title}>Overview : </h3>
                <h6 className={Styles.content}>{film.fullplot}</h6>
              </div>
              {film.cast ? (
                <div className={`${Styles.cast} mt-3`}>
                  <h3 className={Styles.title}>Cast : &nbsp;</h3>
                  <h5 className={Styles.cast_name}>
                    {film.cast.map((name) => (
                      <span key={name}>
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

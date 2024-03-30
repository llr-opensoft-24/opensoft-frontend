import React from "react";
import Styles from "../header.module.css";
import { SDFormat } from "../../../helpers/DateHelper";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/img.webp";

const SearchResults = ({ searchResults }) => {
  const router = useNavigate();
  const onListClickHandler = (id) => {
    console.log(id);
    router(`/poster?id=${id}`);
  };
  return (
    <div
      className={`${Styles.search_box} d-flex flex-column text-dark position-absolute mt-1`}
    >
      {searchResults.length > 0 ? (
        searchResults.map((result, index) => (
          <div
            key={index}
            className={`${Styles.search_list} d-flex align-items-center flex-row my-2`}
            onClick={() => onListClickHandler(result.imdb.id)}
          >
            <img
              src={result.poster ? result.poster : img}
              alt="poster"
              width={50}
              height={50}
              className={Styles.movie_poster}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = img;
              }}
            />
            <div className="p-2 d-flex flex-column justify-content-center">
              <p className="m-0">{result.title}</p>
              <p className="m-0" style={{ fontSize: "0.75rem" }}>
                {SDFormat(result.released)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center m-0">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;

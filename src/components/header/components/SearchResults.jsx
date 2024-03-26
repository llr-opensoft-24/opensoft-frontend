import React from "react";
import Styles from "../header.module.css";
const SearchResults = ({ searchResults }) => {
  return (
    <div className={`${Styles.search_box} position-absolute mt-1`}>
      {searchResults.map((result) => (
        <div key={result.id} className="d-flex align-items-center flex-row my-2">
          <img src={result.poster} alt="poster" width={50} height={50} className={Styles.movie_poster}/>
          <div>
            <p className="">{result.title}</p>
            <p className="">{result.release_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

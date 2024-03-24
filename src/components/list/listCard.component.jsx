import React from 'react';
import filmData from '../../assets/film.json';
import styles from './list.module.css';


const Movies = () => {
  return (
    <div className="container">
      <div className={`row ${styles.row}`}>
        {filmData.map((film, index) => (
          <div key={index} className="col-md-2 mb-2">
            <div className="card">
              <img src={film.Poster} className="card-img-top poster-image" alt={film.Title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;


// import { useEffect, useState } from "react";
// import { fetchData } from "../api/api";
// import axios from 'axios';

// const List = ({ title, param }) => {
//   const [list, setList] = useState([]);
//   useEffect(()=>{
//     fetchData(param).then( res => setList(res.data.results))
//   },[]);
//   console.log(list)
//   return(
//     <div className="list">
//       <div className={Styles.row}>
//         <h2 className="text-white title">{ title }</h2>
//         <div className="col">
//           <div className={Styles.row__posters}>
//             {
//               list.map(item => <img
//                 className={`${Styles.row__poster} ${Styles.row__posterLarge}`}
//                 src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
//                 alt={item.title}
//               />)
//             }
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default List;





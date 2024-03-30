import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [filmData, setFilmData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchMovies= async () => {
    try {
      const response = await axios.get(`http://4.247.166.168/movies`,{
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        }
      })
      if(response.data && response.data.data){
        setFilmData(response.data.data)
        setIsLoading(false)
      }
    }
    catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <MovieContext.Provider value={{ filmData, isLoading }}>
      {children}
    </MovieContext.Provider>
  );
};

const useMovie = () => {
  return useContext(MovieContext);
};

export { MovieProvider, useMovie };
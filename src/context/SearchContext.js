import axios from "axios";
import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchMovies = async (query) => {
    try {
      const response = await axios.get(
        `http://4.247.166.168/search?q=${query}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.data) {
        setSearchResults(response.data.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const contextValue = {
    searchResults,
    selectedMovie,
    isLoading,
    searchMovies,
    selectMovie: (movie) => {
      searchResults.find((m) => m.imdb.id === movie.imdb.id);
      setSelectedMovie(movie);
    },
  };
  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearch };

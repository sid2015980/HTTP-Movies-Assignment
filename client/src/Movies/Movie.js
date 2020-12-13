import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, data, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5003/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const editMovie = () => {
    history.push(`/update-movie/${params.id}`);
  };

  const deleteMovie = () => {
    console.log(params.id);
    axios
      .delete(`http://localhost:5003/api/movies/${params.id}`)
      .then((res) => {
        const filtered = data.filter((movie) => movie.id !== res.data);
        setMovieList(filtered);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div>
        <button onClick={editMovie}>edit</button>
      </div>
      <div>
        <button onClick={deleteMovie}>delete</button>
      </div>
    </div>
  );
}

export default Movie;
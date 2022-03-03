import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

export function EditMovieDetails({ movieList, setMovieList}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState(movieList[id].name);
    const [poster, setPoster] = useState(movieList[id].poster);
    const [rating, setRating] = useState(movieList[id].rating);
    const [summary, setSummary] = useState(movieList[id].summary);
    const [trailer, setTrailer] = useState(movieList[id].trailer);
    return (
        <div className="AddMovie">
          <input className='add-movie-input'
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter a movie name" />
          <input className='add-movie-input'
            value={poster}
            onChange={(event) => setPoster(event.target.value)}
            placeholder="Enter a poster url" />
          <input className='add-movie-input'
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            placeholder="Enter a rating" />
          <input className='add-movie-input'
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Enter a summary" />
          <input className='add-movie-input'
            value={trailer}
            onChange={(event) => setTrailer(event.target.value)}
            placeholder="Enter a trailer url" />
            <Button
            color="primary"
            variant="contained"
            onClick={() => {
                if (name && poster && rating && summary && trailer) {
                    navigate("/movies");
                    const newMovie = {
                    name: name,
                    poster: poster,
                    rating: rating,
                    summary: summary,
                    trailer: trailer
                    };
                    setMovieList([...movieList.slice(0, id), newMovie, ...movieList.slice(id + 1)]);
                    setName("");
                    setPoster("");
                    setRating("");
                    setSummary("");
                    setTrailer("");
                }
            }}
            >Done</Button>
    </div>
    )
}
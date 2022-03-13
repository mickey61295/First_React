import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {API} from "./global";

export function EditMovieDetails() {
    
    const { id } = useParams();
    const [movie, setMovie] = useState();
    useEffect(() => {
        fetch(`${API}/${id}`)
        .then(data => data.json())
        .then(data => setMovie(data))
    }, [id]);

    
    
    return movie?<EditMovieForm movie={movie}/>:"Loading...";
}

function EditMovieForm({movie}){
  const id = movie.id;
  const navigate = useNavigate();
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
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
        color="success"
        variant="contained"
        onClick={() => {
          if (name && poster && rating && summary && trailer) {
              const newMovie = {
              name: name,
              poster: poster,
              rating: rating,
              summary: summary,
              trailer: trailer
              };
              fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(newMovie)
              }).then(data => data.json())
              .then(()=>navigate("/movies"));
          }
          else {
              alert("Please fill out all fields");
          }
        }}
      >Save</Button>
    </div>
  ) 
}
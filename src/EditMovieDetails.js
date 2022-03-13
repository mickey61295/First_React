import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {API} from "./global";

export function EditMovieDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState("");
    const [summary, setSummary] = useState("");
    const [trailer, setTrailer] = useState("");
    useEffect(() => {
        fetch(`${API}/${id}`)
        .then(data => data.json())
        .then(data => {setName(data.name)
        setPoster(data.poster)
        setRating(data.rating)
        setSummary(data.summary)
        setTrailer(data.trailer)})
    }, [id]);
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
                    setName("");
                    setPoster("");
                    setRating("");
                    setSummary("");
                    setTrailer("");
                }
                else {
                    alert("Please fill out all fields");
                }
            }}
            >Done</Button>
    </div>
    )
}
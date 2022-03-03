import { Button } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddMovie({ movieList, setMovieList }) {
    const [name, setName] = useState()
    const [poster, setPoster] = useState()
    const [rating, setRating] = useState()
    const [summary, setSummary] = useState()
    const [trailer, setTrailer] = useState()
    const navigate = useNavigate();
  
    function resetForm(){
        for (let i of document.getElementsByClassName("add-movie-input")) {
        i.value = "";
        } 
    }
    return(
        <div className="AddMovie">
        <input className='add-movie-input'
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter a movie name"
        />
        <input className='add-movie-input'
        onChange={(event) => setPoster(event.target.value)}
        placeholder="Enter a poster url"
        />
        <input className='add-movie-input'
        onChange={(event) => setRating(event.target.value)}
        placeholder="Enter a rating"
        />
        <input className='add-movie-input'
        onChange={(event) => setSummary(event.target.value)}
        placeholder="Enter a summary"
        />
        <input className='add-movie-input'
        onChange={(event) => setTrailer(event.target.value)}
        placeholder="Enter a trailer url"
        />
        <Button
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
            setMovieList([...movieList, newMovie]);
            setName("");
            setPoster("");
            setRating("");
            setSummary("");
            setTrailer("");
            resetForm();
        }
        else {
            alert("Please fill out all fields");
        }}
        }
        variant="contained"
        >Add Movie</Button>
        </div>
    )
}
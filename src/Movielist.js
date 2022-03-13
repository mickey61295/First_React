import Button from '@mui/material/Button';
import { useState } from "react";
import { Profile } from "./Movie";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {API} from "./global";


export function Movielist() {
  const [movieList, setMovieList] = useState([]);
  const getMovies = () => {
    fetch(`${API}`)
    .then((response) => response.json())
    .then((data) => setMovieList(data))
  }
  useEffect(() => getMovies(), [])
  const [displayState, setDisplayState] = useState("none");
  const styles = {
    display: displayState,
  };
  const [name, setName] = useState();
  const [poster, setPoster] = useState();
  const [rating, setRating] = useState();
  const [summary, setSummary] = useState();
  const [trailer, setTrailer] = useState();
  const navigate = useNavigate();

  function resetForm() {
    //   Will replace with virtual DOM
    for (let i of document.getElementsByClassName("add-movie-input")) {
      i.value = "";
    }
  }

  return (

    <div className="App">
      <div className="addMovie">
        <div className="add-movie-form" style={styles}>
          <input className='add-movie-input'
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter a movie name" />
          <input className='add-movie-input'
            onChange={(event) => setPoster(event.target.value)}
            placeholder="Enter a poster url" />
          <input className='add-movie-input'
            onChange={(event) => setRating(event.target.value)}
            placeholder="Enter a rating" />
          <input className='add-movie-input'
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Enter a summary" />
          <input className='add-movie-input'
            onChange={(event) => setTrailer(event.target.value)}
            placeholder="Enter a trailer url" />

          <Button
            onClick={() => {
                if (name && poster && rating && summary && trailer) {
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
                }
            }}
            variant="contained">Add Movie</Button>
          <Button
            onClick={() => {
                setName("");
                setPoster("");
                setRating("");
                setSummary("");
                setTrailer("");
            }}
            color="error"
            variant="contained">Reset</Button>
        </div>
        <div className="movieBtn">
          <Fab
            onClick={() => {
              setDisplayState(displayState === "none" ? "block" : "none");
              resetForm();
            }}
            color="primary"
            aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
      <div className="pageContainer">
        {movieList.map((item, index) => (
          
          <Profile
            key={item.id}
            movieList = {movieList}
            setMovieList = {setMovieList}
            id={item.id}
            ind={index}
            deleteButton = {
                <Button
                  onClick={() => {
                      fetch(`${API}/${item.id}`, {method: "DELETE"})
                      .then(() => getMovies())
                    } }
                  className="deletebutton"
                  color="error"
                  aria-label="delete-button">
                  <DeleteIcon />
                </Button>
                }
            editButton = {
              <Button
                onClick={() => {
                    navigate("/movies/" + "edit/"+ item.id);
                  } }
                className="deletebutton"
                color="secondary"
                aria-label="edit-button">
                <EditIcon />
              </Button>
            }
            />
        ))}

      </div>
    </div>
  );
}

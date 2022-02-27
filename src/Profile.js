import { IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";
import { Counter } from "./Counter";
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate, useParams } from "react-router-dom";



export function Profile(props) {
  const navigate = useNavigate();
    const { name, img, rating, summary, id } = props;
    const [displayState, setDisplayState] = useState("none");
    const styles = {
      display: displayState,
    };
    const [descToggle, setDescToggle] = useState(true);
    return (
      <div className="movie-container">
        
          <img className="movie-poster" src={img} alt={name} />
          <div className="movie-specs">

        <h2 className="movie-name">{name}
        <IconButton
        onClick={() => {
          setDisplayState(displayState === "none" ? "block" : "none");
          setDescToggle(!descToggle);
        } }
          className="bt-sz-lg"
          color="primary"
          aria-label="like">
          {descToggle ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
        <IconButton
        onClick={() => {
          // change url
          navigate("/movies/" + id);
        } }
          className="bt-sz-lg"
          color="primary"
          aria-label="like">
          <InfoIcon />
        </IconButton>
        </h2>
        
        <p style = {{color: rating <= 8 ? rating <=6.5? "Red":"blue" : "Green"}}className="movie-rating">⭐{rating}</p>
        </div>
        
        <div className="movie-desc">
        <p style={styles} className="movie-summary">{summary}</p>
        <Counter />
        </div>
      </div>
    );
  }

export function MovieDetails({movieList}) {
  const { id } = useParams();
  const movie = movieList[id];
  return (
    <div>
      <h1>Movie Details {id}</h1>
      <img src={movie.poster} alt={movie.name} />
      <h1>{movie.name}</h1>
      <h1>{movie.rating}</h1>
      <h1>{movie.summary}</h1>
      
    </div>
  )
}
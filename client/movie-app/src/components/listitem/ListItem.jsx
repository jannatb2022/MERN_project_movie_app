import "./ListItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/" + item, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem('userm')).accessToken
          },
        });

        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <div>
      
        <div
          className="listItem"
          style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={movie.img} alt="" />
          {isHovered && (
            <>
              <video src={movie.video} autoPlay={true} loop />
              <div className="itemInfo">
                <div className="icons">
                  <Link to='/watch' state={{movi : movie}}>
                  <PlayArrow className="icon" />
                  </Link>
                  
                  <Add className="icon" />
                  <ThumbUpAltOutlined className="icon" />
                  <ThumbDownOutlined className="icon" />
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">+{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genre">{movie.genre}</div>
              </div>
            </>
          )}
        </div>
     
    </div>
  );
}

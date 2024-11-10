import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1.eyJhdWQiOiIzMmFmMDYyNTdkNTI0YzI1OGMzYWFkMjlkYzM3MjI3ZiIsIm5iZiI6MTczMTA0NzA4Mi4wMTE2MzM2LCJzdWIiOiI2NzJkYWQwNTRiMzBlOTI5Y2Q2ZjI0YzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5l8JsDP_Wn4nXvRdlYjpptR3YYx4eX0FsO3W1Ixor7I'
    }
  };
  

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
  }, [])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="card-image" />
                    <p>{card.original_title}</p>
                 </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
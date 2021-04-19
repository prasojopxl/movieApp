import React, {useEffect, useState} from 'react';
import axios from "axios";

export const Movie = () => {
    const keyApi = "443a52796239920505dc17c17729bb40";
    const pathImage="https://image.tmdb.org/t/p/w500/";
    const [movie, setMovie] = useState([]);
    const [genre, setGenre] = useState([]);
    const [genreId, setGenreId] = useState([28])


    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${keyApi}&with_genres=${genreId}`)
        .then((res)=> {
            console.log(res.data)
            setMovie(res.data.results)
        })
    }


    const handleChange = (e) => {
        setGenreId(e)
        getData();
        console.log(genreId)
    }

    useEffect(()=> {
        getData();

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${keyApi}&language=en-US`)
        .then((res)=> {
            console.log(res.data.genres)
            setGenre(res.data.genres);
        })
    },[])


    return (
        <div>
            <h2>Discover</h2>
            <select onChange={(e)=>handleChange(e.target.value)}>
                {genre.map((item, index)=> {
                    return (
                        <option key={index} value={item.id}>{item.name}</option>
                    )
                })}
            </select>
            <div className="row">
            {
                movie.map((item, i)=> {
                    return (
                        <div className="col-2" key={i}>
                            <div className="item-movie" key={i}>
                                <div className="imgwrp"><img src={`${pathImage}`+item.poster_path} alt={item.original_title}/></div>
                                <h4>{item.original_title}</h4>
                            </div>
                        </div>
                    )
                })
            }
            </div>

        </div>
    )
}

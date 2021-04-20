import React, {useEffect, useState} from 'react';
import axios from "axios";

export const Movie = () => {
    const keyApi = "443a52796239920505dc17c17729bb40";
    const pathImage="https://image.tmdb.org/t/p/w500/";
    const [movie, setMovie] = useState([]);
    const [genre, setGenre] = useState([]);
    const [genreId, setGenreId] = useState([28])
    const [page, setPage] = useState(1)

    const getData = () => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${keyApi}&with_genres=${genreId}&page=${page}`)
        .then((res)=> {
            setMovie(res.data.results)
        })
    }

    const handleChange = (e) => {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${keyApi}&with_genres=${e}`)
        .then((res)=> {
            setGenreId(e)
            setMovie(res.data.results)
        })
    }

    const handleLoad = () => {
        setPage(page+1)
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${keyApi}&with_genres=${genreId}&page=${page}`)
        .then((res)=> {
            setMovie([...movie, ...res.data.results])
        })
    }

    useEffect(()=> {
        getData();
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${keyApi}&language=en-US`)
        .then((res)=> {
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

            <div className="itemcenter"><button className="btnloadmore" onClick={()=>handleLoad()}>Load More</button></div>

        </div>
    )
}

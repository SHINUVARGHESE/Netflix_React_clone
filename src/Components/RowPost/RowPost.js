import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import {API_KEY, imageUrl} from '../../constant/constant'
import YouTube from 'react-youtube'

function RowPost(props) {
    const [movie, setMovie] = useState([])
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
        axios.get(props.url).then((response)=>{
            setMovie(response.data.results)
            console.log(response.data.results);
        })
    }, [])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,}
    }
    const manageMovie = (id)=>{https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
        console.log(id);
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
            if(response.data.results.length !== 0){
            setUrlId(response.data.results[0])
            }else{
                console.log('Array empty');
            }
        })
    }
    return (
        <div className='row'>
            <h1>{props.title}</h1>
            <div className='posters'>
                {
                   movie.map((item, ky)=> 
                    <img onClick={()=>{manageMovie(item.id)}} key={ky} className={props.isSmall ? 'smallPoster' :'poster'} src={`${imageUrl+item.backdrop_path }`}/>
                   )
               }
           </div>
          {urlId && <YouTube opts={opts} videoId={urlId.key}/>}
        </div>
    )
}

export default RowPost

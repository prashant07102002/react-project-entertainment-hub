import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SingleContent from '../../components/SingleContent/SingleContent'
import './Trending.css'
import CustomPagination from '../../components/Pagination/custompagination'
function Trending() {
    let [page, setPage] = useState(1);
    let [content, setContent] = useState([])
    async function fetchTrending() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results)
    }
    useEffect(() => {
        fetchTrending();
    }, [page])
    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='Trending'>
                {
                    content && content.map((c) => {
                        return (
                            <SingleContent poster={c.poster_path} key={c.id} id={c.id} title={c.title || c.name} date={c.first_air_date || c.release_date} vote_average={c.vote_average} media_type={c.media_type} />)
                    })
                }
            </div>
            <CustomPagination setPage={setPage} numofPages={10} />
        </div>
    )
}

export default Trending
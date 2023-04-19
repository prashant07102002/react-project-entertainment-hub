import React, { useEffect, useState } from 'react'
import useGenre from '../../components/hook/useGenre';
import axios from 'axios';
import Genre from '../../components/Genre/Genre';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/custompagination';
function Series() {
    let [page, setPage] = useState(1);
    let [content, setContent] = useState([]);
    let [numofPages, setNumOfPages] = useState(0);
    let [genre, setGenre] = useState([]);
    let [selectedgenre, setSelectedgenre] = useState([]);
    const genreforURL = useGenre(selectedgenre);
    async function fetchSeries() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`);

        setContent(data.results)
        setNumOfPages(data.total_pages)
    }
    useEffect(() => {
        fetchSeries();
        // eslint-disable-next-line
    }, [page, genreforURL])
    return (
        <div>
            <span className='pageTitle'>Series</span>
            <Genre genres={genre} selectedgenre={selectedgenre} setGenre={setGenre} setSelectedgenre={setSelectedgenre} type='tv' setPage={setPage} />
            <div>
                <div className='Trending'>
                    {
                        content && content.map((c) => {
                            return (
                                <SingleContent poster={c.poster_path} key={c.id} id={c.id} title={c.title || c.name} date={c.release_date || c.first_air_date} vote_average={c.vote_average} media_type='tv' />)
                        })
                    }
                </div>
                {numofPages > 1 && (
                    <CustomPagination setPage={setPage} numofPages={numofPages} />
                )}
            </div>
        </div>
    )
}

export default Series
import React, { useEffect, useState } from 'react'
import { Button, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/custompagination';
import axios from 'axios';

function Search() {
    let [type, setType] = useState(0);
    let [page, setPage] = useState(1);
    let [searchtext, setSearchtext] = useState('');
    let [content, setContent] = useState([]);
    let [numofPages, setNumOfPages] = useState(1);
    async function fetchSearch(e) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchtext}&page=${page}&include_adult=false`)
        setContent(data.results);
        setNumOfPages(data.total_pages)

    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [page, type])
    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff'
            }
        }
    })
    return (

        <>
            <ThemeProvider theme={darkTheme} >
                <div style={{ display: "flex", margin: "0px 0" }}>
                    <TextField onChange={(e) => setSearchtext(e.target.value)} style={{ flex: 1 }} className='searchBox' label='Search' variant='filled' />
                    <Button onClick={fetchSearch} variant='contained' style={{ marginLeft: '10px' }}> <SearchIcon /></Button>
                </div>
                <Tabs style={{ padding: '5px', width: '100%' }} value={type} indicatorColor='primary' textColor='primary' onChange={(event, newValue) => { setType(newValue); setPage(1) }}>
                    <Tab style={{ width: '50%' }} label='Search Movie' />
                    <Tab style={{ width: '50%' }} label='Search Series' />
                </Tabs>
            </ThemeProvider >
            <div>
                <div className='Trending'>
                    {
                        content && content.map((c) => {
                            return (
                                <SingleContent poster={c.poster_path} key={c.id} id={c.id} title={c.title || c.name} date={c.first_air_date || c.release_date} vote_average={c.vote_average} media_type={type ? 'tv' : 'movie'} />)
                        })
                    }
                    {
                        searchtext && !content && (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)
                    }
                </div>
                {numofPages > 1 && (
                    <CustomPagination setPage={setPage} numofPages={numofPages} />
                )}
            </div>
        </ >

    )
}

export default Search
import React, { useEffect } from 'react'
import axios from 'axios'
import { Chip } from '@material-ui/core'
function Genre({
    genres,
    setGenre,
    selectedgenre,
    setSelectedgenre,
    type,
    setPage,
}) {
    function handleAdd(genre) {
        setSelectedgenre([...selectedgenre, genre]);
        setGenre(genres.filter((g) => g.id !== genre.id))
        setPage(1);
    }
    function handleRemove(genre) {
        setSelectedgenre(selectedgenre.filter((g) => g.id !== genre.id))
        setGenre([...genres, genre]);
        setPage(1);
    }
    async function fetchGenre() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenre(data.genres)
    }
    useEffect(() => {
        fetchGenre();
    }, [])
    return (
        <div style={{ padding: '6px 0' }}>
            {selectedgenre && selectedgenre.map((genre) => {
                return (
                    <Chip style={{ margin: '2px' }} label={genre.name} size='small' clickable key={genre.id} color='primary' onDelete={() => handleRemove(genre)} />
                )
            })}
            {genres && genres.map((genre) => {
                return (
                    <Chip style={{ margin: '2px' }} label={genre.name} size='small' clickable key={genre.id} onClick={() => handleAdd(genre)} />
                )
            })}
        </div>
    )
}

export default Genre
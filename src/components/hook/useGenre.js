// import React from 'react'

function useGenre(selectedgenre) {
    if (selectedgenre.length < 1)
        return "";
    const Genreids = selectedgenre.map((g) => g.id)
    return Genreids.reduce((acc, curr) => acc + "," + curr)
}

export default useGenre
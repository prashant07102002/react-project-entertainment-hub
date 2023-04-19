import React from 'react'
import Pagination from '@material-ui/lab/Pagination'
import './pagination.css'
import { ThemeProvider, createTheme } from '@material-ui/core';

function CustomPagination(props) {
    const darkTheme = createTheme({
        palette: {
            type: 'dark',
        }
    })
    function handlepage(e) {
        props.setPage(e.target.textContent);
        window.scroll(0, 0);

    }
    return (
        <div className='pagination'>
            <ThemeProvider theme={darkTheme}>
                <Pagination onClick={handlepage} count={props.numofPages} color='secondary' hideNextButton
                    hidePrevButton />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
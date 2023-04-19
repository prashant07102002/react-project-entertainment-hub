import * as React from 'react';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const usestyle = makeStyles({
    root: {
        width: '100%',
        height: '40px',
        position: 'fixed',
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#2d313a",
    }
})

export default function SimpleBottomNavigation() {
    const classes = usestyle();
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (value === 0) navigate('/')
        else if (value === 1) navigate('/movies')
        else if (value === 2) navigate('/series')
        else if (value === 3) navigate('/search')
    }, [value])


    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation showLabels value={value} onChange={(event, newValue) => { setValue(newValue); }}
                className={classes.root}>
                <BottomNavigationAction style={{ color: "white" }} label="Trending" icon={<WhatshotIcon />} />
                <BottomNavigationAction style={{ color: "white" }} label="Movie" icon={<MovieIcon />} />
                <BottomNavigationAction style={{ color: "white" }} label="TvSeries" icon={<LiveTvIcon />} />
                <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} />
            </BottomNavigation>
        </Box>
    );
}
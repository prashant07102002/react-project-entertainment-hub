import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import './ContentModal.css'
import { Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/esm/YouTube'
import Carousel from '../Carousel/Carousel';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        width: '90%',
        height: '80%',
        backgroundColor: '#39445a',
        border: '1px solid #282c34',
        borderRadius: '10px',
        color: 'white',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3),
    },
}));
export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let [content, setContent] = useState();
    let [video, setVideo] = useState();
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    async function fetchData() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setContent(data)
        // console.log(data)
    }
    async function fetchVideo() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setVideo(data.results[0]?.key)
        // console.log(data)
    }

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div style={{ cursor: 'pointer' }} color='inherit ' className='media' onClick={handleOpen}>{children}</div>
            <Modal className={classes.modal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className='ContentModal'>
                                <img className='ContentModal_portrait' src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} alt={content.name || content.title} />
                                <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className='ContentModal_landscape' />
                                <div className='ContentModal_about'>
                                    <span className='ContentModal_title'>
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date || content.release_date || "----"
                                        ).substring(0, 4)})
                                    </span>
                                    {content.tagline &&
                                        <i className='tagline'>{content.tagline}</i>
                                    }
                                    <span className='ContentModal_description'>
                                        {content.overview}
                                    </span>
                                    <div>
                                        <Carousel media_type={media_type} id={id} />
                                    </div>
                                    <Button variant='contained' startIcon={<YouTubeIcon />} color='secondary' target='_blank' href={`https://www.youtube.com/watch?v=${video}`}>
                                        Watch the trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </ >

    );
}
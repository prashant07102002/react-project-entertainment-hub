import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../config/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        }
    }
    let [credits, setCredits] = useState([]);
    const items = credits.map((c) => {
        return (
            <div className='carousel_item'>
                <img className='carousel_img' src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} alt={c?.name} onDragStart={handleDragStart} role='presentation' />
                <b className='carousel_text'>{c?.name}</b>
            </div>
        )
    })
    async function fetchCarousel() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setCredits(data.cast);
    }
    useEffect(() => {
        fetchCarousel();
    }, [])
    return (
        <AliceCarousel autoPlay responsive={responsive} infinite disableDotsControls disableButtonsControls mouseTracking items={items} />
    );
}
export default Carousel
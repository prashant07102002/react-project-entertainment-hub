import React from 'react'
import { img_300, unavailable } from '../../config/config';
import './SingleContent.css'
import { Badge } from '@material-ui/core';
import ContentModal from '../ContentModal/ContentModal';

function SingleContent(props) {
    return (
        <ContentModal media_type={props.media_type} id={props.id}>
            <Badge overlap='rectangular' badgeContent={props.vote_average} color={props.vote_average > 6 ? 'primary' : 'secondary'} />
            <img className='poster' src={props.poster ? `${img_300}/${props.poster}` : `${unavailable}`} alt={`${props.title}`} />
            <b className='title'>{props.title}</b>
            <span className='subtitle' >
                {props.media_type === 'tv' ? "Tv Series" : "Movie"}
                <span className='subtitle'>{props.date}</span>
            </span>
        </ContentModal>
    )
}

export default SingleContent
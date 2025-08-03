import { Link, useNavigate } from 'react-router-dom'
import { ImageCarousel } from './ImageCarousel.jsx'
import { getReviewAvg, numberWithCommas } from '../services/utils/util.service.js'

export function StayPreview({ stay }) {
    const navigate = useNavigate()
    
    function onShowDetails(stayId) {
        navigate(`/stay/${stayId}`)
    }

    return (
        <section className="stay-preview-container">
            <div className="imgCarousel">
                <ImageCarousel stay={stay} onShowDetails={onShowDetails} />
            </div>
            <article onClick={() => onShowDetails(stay._id)} className="stay-preview">
                <p className="stay-loc">{stay.loc.city}, {stay.loc.country}</p>
                <p className="stay-distance">{stay.roomType}</p>
                {/* <p className="stay-dates">{stay.availableDates[0].month} {stay.availableDates[0].start} - {stay.availableDates[0].end}</p> */}
                <p className="stay-price"><span>${numberWithCommas(stay.price)}</span> night</p>
                <div className="stay-rating-container">
                    <img className="star" src="/svg/star.svg" alt="Star" />
                    {stay.reviews.length > 0
                        ? <>
                            <p className="rating-num">{stay.rating}</p>
                            <p className="ratings-amount">({stay.reviews.length})</p>
                        </>
                        : <p>New</p>
                    }
                </div>
                {/* <p className="rating-num">{getReviewAvg(stay.reviews)}</p> */}

            </article>
        </section>
    )
}


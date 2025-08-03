import { useState, useEffect } from 'react'
import { storageService } from '../services/async-storage.service'
import { useDispatch, useSelector } from 'react-redux'

export function ImageCarousel({ stay, onShowDetails }) {
    const dispatch = useDispatch()
    const likedStays = useSelector((state) => state.stayModule.LikedStays)
    const [imgIndex, setImgIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 745)
    const [isLiked, setIsLiked] = useState(likedStays.includes(stay._id))

    useEffect(() => {
        window.addEventListener("resize", handleMobileResize)

        function handleMobileResize() {
            setIsMobile(window.innerWidth < 745)
        }

        return () => {
            window.removeEventListener("resize", handleMobileResize)
        }
    }, [])

    function showPrevImg(ev) {
        ev.stopPropagation()
        if (imgIndex === 0) return
        setImgIndex(imgIndex - 1)
    }

    function showNextImg(ev) {
        ev.stopPropagation()
        if (imgIndex === stay.imgUrls.length - 1) return
        setImgIndex(imgIndex + 1)

    }

    function toggleHeart() {
        const updatedLikedStays = isLiked
            ? likedStays.filter(stayId => stayId !== stay._id)
            : [...likedStays, stay._id];

        dispatch({ type: 'SET_LIKED_STAYS', LikedStays: updatedLikedStays })
        setIsLiked(!isLiked);
        localStorage.setItem('likedStays', JSON.stringify(updatedLikedStays))

    }

    return (
        <div className="carousel-container">
            <div className="image-container">
                {imgIndex > 0 && !isMobile && (
                    <button className="nav-button prev" onClick={(event) => showPrevImg(event)}>
                        <img src="/svg/leftArrow.svg" alt="Left arrow" />
                    </button>
                )}
                <div className="heart" onClick={toggleHeart}>
                    <img src={isLiked ? '/svg/redHeart.svg' : '/svg/heart.svg'} alt="Heart" />
                </div>
                <div className="images">
                    {stay.imgUrls.map((url, index) => (
                        <img id={index} key={index} onClick={() => onShowDetails(stay._id)} src={url} style={{ translate: `${-100 * imgIndex}%` }} />
                    ))}
                </div>
                <div className="dots">
                    {stay.imgUrls.map((_, index) => (
                        <span key={index} className={`dot ${index === imgIndex ? 'active' : ''}`}></span>
                    ))}
                </div>
                {imgIndex < stay.imgUrls.length - 1 && !isMobile && (
                    <button className="nav-button next" onClick={(event) => showNextImg(event)}>
                        <img src="/svg/rightArrow.svg" alt="Right arrow" />
                    </button>
                )}
            </div>
        </div>
    )
}

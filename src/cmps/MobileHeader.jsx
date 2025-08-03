import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'


export function MobileHeader() {
    const isDetailsPage = location.pathname.startsWith("/stay/")
    const navigate = useNavigate()



    return (
        <div className="mobile-header">
            <button className="return-btn" onClick={() => navigate(-1)}>
                <img src="/svg/leftArrow.svg" />
            </button>
            {isDetailsPage &&
                (
                    <div className="stay-actions">
                        <button className="share-btn">
                            <img src="/svg/share.svg" alt="Share" />
                        </button>
                        <button className="save-btn">
                            <img src="/svg/save.svg" alt="Save" />
                        </button>
                    </div>
                )
            }
        </div>
    )
}
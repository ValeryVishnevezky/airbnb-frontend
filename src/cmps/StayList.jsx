import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

export function StayList({ stays }) {
    const sortedStays = [...stays].sort((a, b) => {
        if (b.rating !== a.rating) {
            return b.rating - a.rating
        }
        return b.reviews.length - a.reviews.length
    })

    return (
        <section className="stay-list-container">
            <ul className="stay-list">
                {sortedStays.map(stay =>
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>)
                }
            </ul>
        </section>
    )
}
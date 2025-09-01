import { userService } from '../services/user'
import { StayPreview } from './StayPreview'

export function StayList({ stays }) {

    return (
        <section className="stay-list-container">
            <ul className="stay-list">
                {stays.map(stay =>
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>)
                }
            </ul>
        </section>
    )
}
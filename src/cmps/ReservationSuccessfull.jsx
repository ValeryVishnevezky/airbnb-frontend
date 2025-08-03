import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { numberWithCommas } from '../services/utils/util.service'
import { useNavigate } from 'react-router-dom'

const MySwal = withReactContent(Swal)

export function ReservationSuccessfull({ stay, reservationDates, guests, totalPrice, onClose }) {
    const navigate = useNavigate()

    useEffect(() => {
        MySwal.fire({
            icon: 'success',
            title: 'Reserved successfully',
            html: (
                <div className="reservation-success-content">
                    <p>
                        You can follow the order status in{" "}
                        <span
                            className="link"
                            onClick={() => {
                                Swal.close() 
                                onClose() 
                                navigate('/trips') 
                            }}
                        >
                            My trips
                        </span>{" "}
                        page
                    </p>
                    <div className="stay-image">
                        <img src={stay.imgUrls[0]} alt={stay.name} />
                        <p>{stay.name}</p>
                        <p>{stay.loc.city}, {stay.loc.country}</p>
                    </div>
                </div>
            ),
            showCloseButton: false,
            focusConfirm: false,
            confirmButtonText: 'Close',
            customClass: {
                popup: 'reservation-success-popup',
            },
        }).then(() => {
            onClose()
        })
    }, [stay, reservationDates, guests, totalPrice, onClose, navigate])

    return null
}

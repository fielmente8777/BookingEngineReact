import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthProvider'
import "../style/Booking.css"
const Booking = () => {

    const { Button_color, Bg_color, AllUserBookings, FetchUsersBookings, AllFutureUserBookings, FetchUsersFutureBookings, DeleteUserBookings } = useContext(AuthContext)
    //background for header and footer

    useEffect(() => {
        FetchUsersBookings()
        FetchUsersFutureBookings()
    }, [])

    const [allbook, setallbook] = useState(true)
    const [pastbook, setpastbook] = useState(true)
    const [futurebook, setfuturebook] = useState(true)

    const CancelBooking = (bookingid) => {
        const isConfirmed = window.confirm("Are you sure you want to cancel the booking?");

        // Check if the user confirmed
        if (isConfirmed) {
            // Perform the cancellation action
            // For example, you can call a function to cancel the booking here
            DeleteUserBookings(bookingid)
        }
    }

    return (
        <div className='container ourbooking'>
            <div className='d-flex gap-3 align-items-center my-3'>
                <div className='d-flex gap-1 align-items-center'>
                    <input type='radio' name='bookingType' onClick={() => { setfuturebook(true); setpastbook(true) }} />
                    All Bookings

                </div>
                <div className='d-flex gap-1 align-items-center'>
                    <input type='radio' name='bookingType' onClick={() => { setfuturebook(false); setpastbook(true) }} />Past Bookings

                </div>
                <div className='d-flex gap-1 align-items-center'>
                    <input type='radio' name='bookingType' onClick={() => { setpastbook(false); setfuturebook(true) }} />Upcomming Bookings

                </div>

            </div>
            <table className="ourbookingTable">
                <thead style={{ backgroundColor: Bg_color }}>
                    <tr className="">
                        <th>Booking Id</th>
                        <th>Guest Name</th>
                        <th>Email-Id</th>
                        <th>Phone</th>
                        <th>Total Price</th>
                        <th>Remaining Amount</th>
                        <th>Payment Status</th>
                        <th>Checked In</th>
                        <th>CheckedOut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {allbook ? <>
                    {pastbook ? <tbody>
                        {AllUserBookings.map((booking) => {
                            return <tr>
                                <td>{booking.bookingId}</td>
                                <td>{booking?.guestInfo?.guestName}</td>
                                <td>{booking?.guestInfo.EmailId}</td>
                                <td>{booking?.guestInfo.Phone}</td>
                                <td>{booking?.price?.Total}</td>
                                <td>{booking?.price?.Total - booking?.price?.amountPay}</td>
                                <td>{booking?.payment?.Status}</td>
                                <td>{booking.checkIn}</td>
                                <td>{booking.checkOut}</td>
                                <td>Done</td>
                            </tr>
                        })}


                    </tbody> : ""}
                    {futurebook ? <tbody>
                        {AllFutureUserBookings.map((booking) => {
                            return <tr>
                                <td>{booking.bookingId}</td>
                                <td>{booking?.guestInfo?.guestName}</td>
                                <td>{booking?.guestInfo.EmailId}</td>
                                <td>{booking?.guestInfo.Phone}</td>
                                <td>{booking?.price?.Total}</td>
                                <td>{booking?.price?.Total - booking?.price?.amountPay}</td>
                                <td>{booking?.payment?.Status}</td>
                                <td>{booking.checkIn}</td>
                                <td>{booking.checkOut}</td>
                                <td><button className="canclebutton" onClick={() => { CancelBooking(booking.bookingId) }}>Cancel</button></td>
                            </tr>
                        })}


                    </tbody> : ""}
                </> : ""}
            </table>
        </div>
    )
}

export default Booking
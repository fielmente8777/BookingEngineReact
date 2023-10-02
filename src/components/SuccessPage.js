import React from 'react'
import '../style/SuccessPage.css'
import Button from 'react-bootstrap/Button';
function SuccessPage(props) {
    return (
        <div className='main_success'>
            <div className="succespage">
                <h3>Payment Successfull!</h3>
                <div><i class="fa-regular fa-circle-check m-4" style={{fontSize:'60px'}}></i></div>
                <div className='succuss_MDiv' >
                    <div className='succuss_detailDiv'>
                        {/* <label htmlFor="/">Booking ID</label> */}
                        <label htmlFor="/">Payment ID</label>
                        <label htmlFor="/">Order ID</label>
                        <label htmlFor="/">Name</label>
                        <label htmlFor="/">Phone</label>
                        <label htmlFor="/">Email</label>
                        <label htmlFor="/">Country</label>
                        <label htmlFor="/">Checkin</label>
                        <label htmlFor="/">Checkout</label>
                        <label htmlFor="/">Adult</label>
                        <label htmlFor="/">Kid</label>
                        <label htmlFor="/">Tax</label>
                        <label htmlFor="/">Amount</label>
                        <label htmlFor="/">Payment Status</label>
                        
                    </div>
                    <div className='succuss_detailDiv align-items-end'>
                        {/* <label htmlFor="/">{props.Payment.Booking}</label> */}
                        <label htmlFor="/">{props.Payment.Payment}</label>
                        <label htmlFor="/">{props.Payment.Order}</label>
                        <label htmlFor="/">{props.Payment.Name}</label>
                        <label htmlFor="/">{props.Payment.Phone}</label>
                        <label htmlFor="/">{props.Payment.Email}</label>
                        <label htmlFor="/">{props.Payment.Rooms}</label>
                        <label htmlFor="/">{props.Payment.Checkin}</label>
                        <label htmlFor="/">{props.Payment.Checkout}</label>
                        <label htmlFor="/">{props.Payment.Adult}</label>
                        <label htmlFor="/">{props.Payment.Kid}</label>
                        <label htmlFor="/">{props.Payment.Tax}</label>
                        <label htmlFor="/">{props.Payment.Amount}</label>
                        <label htmlFor="/">{props.Payment.PayStatus}</label>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-4 m-4'>
                    <Button onClick={()=>{window.print()}}>Print</Button>
                    <Button onClick={()=>{window.location.reload()}}>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage

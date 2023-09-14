import React from 'react'
import '../style/SuccessPage.css'
import Button from 'react-bootstrap/Button';
function SuccessPage() {
    return (
        <div className='main_success'>
            <div className="succespage">
                <h3>Payment Successfull!</h3>
                <div><i class="fa-regular fa-circle-check m-4" style={{fontSize:'60px'}}></i></div>
                <div className='succuss_MDiv' >
                    <div className='succuss_detailDiv'>
                        <label htmlFor="/">Payment Type</label>
                        <label htmlFor="/">Bank</label>
                        <label htmlFor="/">Mobile</label>
                        <label htmlFor="/">Email</label>
                        <label htmlFor="/">Amount Paid</label>
                        <label htmlFor="/">Transaction Id</label>
                    </div>
                    <div className='succuss_detailDiv align-items-end'>
                    <label htmlFor="/">Net Banking</label>
                        <label htmlFor="/">HDFC</label>
                        <label htmlFor="/">97561437**</label>
                        <label htmlFor="/">saurabh@eazotel.com</label>
                        <label htmlFor="/">5000</label>
                        <label htmlFor="/">12456789</label>
                    </div>
                </div>
                <div className='d-flex justify-content-center gap-4 m-4'>
                    <Button>Print</Button>
                    <Button>Close</Button>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage

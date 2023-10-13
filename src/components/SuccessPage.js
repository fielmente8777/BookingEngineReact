import React from 'react'
import '../style/SuccessPage.css'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';




function SuccessPage(props) {
    return (
        <div className='main_success'>
            <div className="succespage">
                <h3>Payment Successfull!</h3>
                <div><i class="fa-regular fa-circle-check m-4" style={{ fontSize: '60px' }}></i></div>
                <div className='w-100'>
                    <h6><strong>Guest Information</strong></h6>

                    <div className='succuss_MDiv' >
                        <div className='succuss_detailDiv'>
                            <label htmlFor="/">Name</label>
                            <label htmlFor="/">Phone</label>
                            <label htmlFor="/">Email</label>
                            <label htmlFor="/">Country</label>
                        </div>
                        <div className='succuss_detailDiv align-items-end'>
                            <label htmlFor="/">{props.Payment.Name}</label>
                            <label htmlFor="/">{props.Payment.Phone}</label>
                            <label htmlFor="/">{props.Payment.Email}</label>
                            <label htmlFor="/">{props.Payment.Country}</label>
                        </div>
                    </div>
                    <div className="succesDataTable bookstatus my-2">
                        <h6><strong>Booking Status</strong></h6>
                        <Table striped bordered hover variant="light">
                            <thead>
                                <tr>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Adult</th>
                                    <th>Kid</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.Payment.Checkin}</td>
                                    <td>{props.Payment.Checkout}</td>
                                    <td>{props.Payment.Adult}</td>
                                    <td>{props.Payment.Kid}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </div>
                <div className="succesDataTable">
                    <h6><strong>Payment Information</strong></h6>

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Payment ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.Payment.Order}</td>
                                <td>{props.Payment.Payment}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover variant="light">

                        <thead>
                            <tr>
                                <th>Payment Status</th>
                                <th>Tax</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.Payment.PayStatus}</td>
                                <td>₹ {props.Payment.Tax}</td>
                                <td>₹ {props.Payment.Amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="succesDataTable">
                    <h6><strong>Booked Room</strong></h6>

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Delux</th>
                                <th>Super Delux</th>
                                <th>Suite</th>
                                <th>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className='d-flex justify-content-center gap-4 m-4'>
                    <Button onClick={() => { window.print() }}>Print</Button>
                    <Button onClick={() => { window.location.reload() }}>Close</Button>
                </div>
            </div>


        </div>
    )
}

export default SuccessPage

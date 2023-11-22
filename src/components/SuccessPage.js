import React, { useRef } from 'react';
import '../style/SuccessPage.css'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function SuccessPage(props) {

    const componentRef = useRef(null);

    const generatePDF = async () => {
        // Get a reference to the component's DOM element
        const component = componentRef.current;

        // Use html2canvas to capture the component's content as an image
        const canvas = await html2canvas(component);

        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: 'p', // 'p' for portrait, 'l' for landscape
            unit: 'mm', // unit of measurement
            format: 'a4', // page format
        });

        // Calculate the image's dimensions to fit the PDF page
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 155; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add the image to the PDF
        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Save the PDF as a blob
        const blob = doc.output('blob');

        // Create a URL for the Blob and create a link to trigger the download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice.pdf'; // Set the desired filename for the invoice.

        // Trigger a click event on the link to start the download
        a.click();

        // Clean up by revoking the Blob URL
        URL.revokeObjectURL(url);
    };
    return (
        <div className='main_success' >
            <div className="succespage" ref={componentRef}>
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
                                <td>{props.currency} {props.Payment.Tax}</td>
                                <td>{props.currency} {props.Payment.Amount}</td>
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
                                <td>{props.Payment.Delux}</td>
                                <td>{props.Payment.Sd}</td>
                                <td>{props.Payment.Suite}</td>
                                <td>{props.Payment.Premium}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h6><strong>Meal Plan</strong></h6>

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Plan Name</th>
                                <th>Plan Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.Payment.MealPlan}</td>
                                <td>{props.Payment.Mealprice}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h6><strong>Packages Selected</strong></h6>

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Package Name</th>
                                <th>Package Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.Payment.PackagePlan}</td>
                                <td>{props.Payment.PackagePrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div className='d-flex justify-content-center gap-4 m-4'>
                    {/* <Button onClick={() => { window.print() }}>Print</Button> */}
                    <Button onClick={generatePDF}>Download (PDF)</Button>

                    <Button onClick={() => { window.location.reload() }}>Close</Button>
                    {/* <button onClick={generatePDF}>Download Invoice (PDF)</button> */}

                </div>
            </div>


        </div>
    )
}

export default SuccessPage

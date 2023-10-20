import React, { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';

function Mealplan() {

    const [mealplan, setMealPlan] = useState([]);
    // Fetches meal plan data on component mount and sets it to the state.
    useEffect(() => {
        fetch('https://nexon.eazotel.com/room/packages/engine/d76a7d3b-f063-4872-b424-c3d1c6ef223e')
        .then((response) => response.json())
        .then((data) => setMealPlan(data));
        }, []);



    const plan = [

    ]


    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };


    return (
        <div className='mealplanDiv container'>
            <div className="plnansheading">
                <h5>Add-Ons</h5>
            </div>
            <div className="plansDiv">
                <div class="container plansinr text-decoration-none">


                    {/* {plan.map((planItem, index) => (
                        <div key={index}>
                            <p>Package Name: {planItem.packageName}</p>
                            <p>Package Price: {planItem.packagePrice}</p>
                        </div>
                    ))} */}

                    {plan.map((planItem, index) => (
                        <div class="row" key={index}>
                            <div class="col-5">
                                <span class='plnshead'>{planItem.packageName}</span>
                            </div>
                            <div class="col text-center">
                                <span>₹ {planItem.packagePrice}.00</span>
                            </div>
                            <div class="col text-center">
                                <Form>
                                    {['radio'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-${index}`}
                                                checked={selectedOption === `Option${index}`}
                                                onChange={() => handleRadioChange(`Option${index}`)}

                                            />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        </div>
                    ))}
                    {/* <div class="row">
                        <div class="col-5">
                        <span class='plnshead'>Breakfast</span>
                        </div>
                        <div class="col text-center">
                            <span>₹ 350.00</span>
                        </div>
                        <div class="col text-center">
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={selectedOption === 'Option1'}
                                            onChange={() => handleRadioChange('Option1')}

                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <span class='plnshead' >Breakfast with Lunch or Dinner</span>
                        </div>
                        <div class="col text-center">
                            <span>₹ 1100.00</span>
                        </div>
                        <div class="col text-center">
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            checked={selectedOption === 'Option2'}
                                            onChange={() => handleRadioChange('Option2')}

                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <span class='plnshead' >Breakfast with Lunch And Dinner</span>
                        </div>
                        <div class="col text-center">
                            <span>₹ 1850.00</span>
                        </div>
                        <div class="col text-center">
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`default-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-3`}
                                            checked={selectedOption === 'Option3'}
                                            onChange={() => handleRadioChange('Option3')}

                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Mealplan

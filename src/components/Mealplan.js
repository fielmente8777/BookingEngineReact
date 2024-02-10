import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';

function Mealplan({isperRoom,mealplan,setMealPlan,setselectedMealPlan,setselectedMealPlanPrice,setisperRoom,Mealprice
    ,setMealprice,Delux,SuperDelux,Suite,Premium,PremiereRetreat,
    EliteSuite,
    GrandDeluxe,
    ImperialSuite,
    SupremeRetreat,
    RoyalDeluxe,
    PrestigeSuite,
    ExclusiveRetreat,Adult,setmealplanId,color,Bg_color,baseUrl}) {

    const [price,setprice]=useState('')

    // Fetches meal plan data on component mount and sets it to the state.
    const FetchMeals=async ()=>{
        const response = await fetch(`${baseUrl}/mpackage/packages/engine/${localStorage.getItem('hotelid')}/${localStorage.getItem('hid')}`, {
            method: "GET",
            headers: {
              Accept: "application/json, text/plain, /",
              "Content-Type": "application/json"
            },
      
          });
      
        const json = await response.json();
        setMealPlan(json.Packages)
    }
    useEffect(() => {
        FetchMeals()
    }, [])
    

    if(isperRoom){
        let cost = (Number(Delux)+Number(SuperDelux)+Number(Suite)+Number(Premium)+
        Number(PremiereRetreat)+
        Number(EliteSuite)+
        Number(GrandDeluxe)+
        Number(ImperialSuite)+
        Number(SupremeRetreat)+
        Number(RoyalDeluxe)+
        Number(PrestigeSuite)+
        Number(ExclusiveRetreat))*Number(price)
        setMealprice(cost)
    }
    else{
        setMealprice(Number(Adult)*Number(price))
    }

    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadioChange = (option,price,plan,isperroom,planid) => {
        if(option===selectedOption){
            setSelectedOption(null)
            setselectedMealPlanPrice(0)
            setselectedMealPlan("-")
            setmealplanId("")
            setprice('')
            setMealprice(0)
        }
        else{
            setSelectedOption(option);
            setselectedMealPlanPrice(price)
            setselectedMealPlan(plan)
            setisperRoom(isperroom)
            setmealplanId(planid)
            setprice(price)
            if(isperroom){
                let cost = (Number(Delux)+Number(SuperDelux)+Number(Suite)+Number(Premium))*Number(price)
                setMealprice(cost)
            }
            else{
                setMealprice(Number(Adult)*Number(price))
            }
        }
    };


    return (
        <div className='mealplanDiv container'>
            <div className="plnansheading" style={{background:Bg_color}}>
                <h5><strong>Add-Ons</strong></h5>
            </div>
            <div className="plansDiv">
                <div class="container plansinr text-decoration-none">


                    {/* {plan.map((planItem, index) => (
                        <div key={index}>
                            <p>Package Name: {planItem.packageName}</p>
                            <p>Package Price: {planItem.packagePrice}</p>
                        </div>
                    ))} */}

                    {mealplan.map((planItem, index) => (
                        <div class="row" key={index}>
                            <div class="col-5">
                                <span class='plnshead'>{planItem.packageName}</span>
                            </div>
                            <div class="col text-center">
                                <span>₹ {planItem.packagePrice}</span>
                            </div>
                            <div class="col text-center">
                                <Form>
                                    {['checkbox'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-${index}`}
                                                checked={selectedOption === `Option${index}`}
                                                onChange={() => handleRadioChange(`Option${index}`,planItem.packagePrice,planItem.packageName,planItem.isPerRoom,planItem.planId)}

                                            />
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Mealplan

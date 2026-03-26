import React from 'react'
import { FaPowerOff, FaStar, FaSuitcase } from 'react-icons/fa'
import { FaLocationPin } from 'react-icons/fa6'

const Overview = ({hotelDetails}) => {

    console.log("object",hotelDetails);
    const tags=[
        {
            name:"Meal Upgrade"
        },
        {
            name:"Welcome Drink"
        },
        {
            name:"Happy Hours Offer"
        },
        {
            name:"Early Check-in upto 2hrs*"
        },
    ]
  return (
    <>
    {hotelDetails&&<div className='flex flex-col gap-4 mt-5'>
        <span className='flex text-sm p-2 border border-blue-500 rounded-md bg-blue-500/10 text-blue-500 w-fit items-center gap-1 font-medium'><FaStar/> Instant Booking</span>
        <div className='flex justify-between items-center'>
            {hotelDetails?.HotelName&&<h1 className='text-2xl capitalize font-semibold'>{hotelDetails?.HotelName}</h1>}
            <span className='flex text-sm bg-green-600 text-white items-center gap-1 py-2 w-fit px-2 rounded-md'><FaStar className='text-white' size={12}/> 4.9/576 Reviews</span>
        </div>
        {hotelDetails?.Footer?.Address&&<div>
            <span className='text-md font-medium flex items-center gap-1'>
                <FaLocationPin className='text-black'/>{hotelDetails?.Footer?.Address}
            </span>
        </div>}

        <div className='h-[px] border border-blue-400'/>

        <div className='flex items-center gap-1 flex-grow'>
            {tags.map((item)=>(
                <span key={item.name} className='flex text-sm py-2 flex-1 px-4 border border-blue-500 rounded-md bg-gray-500/10 text-black-500 w-fit items-center gap-1 font-medium'><FaStar/> {item.name}</span>
            ))}
        </div>
        <div className='rounded-xl border-2 border-yellow-500
        p-4 flex flex-col gap-2 bg-[#FFF8EC]
        '>
            <h1 className='text-black font-semibold text-lg'>Overview</h1>
            {hotelDetails?.AboutUs&&<p className='text-md text-[#464646]'>{hotelDetails?.AboutUs}</p>}
        </div>
    </div>}
    </>

  )
}

export default Overview
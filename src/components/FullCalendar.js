import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const FullCalendar = (props) => {
    const {checkinDate,setcheckinDate,setcheckoutDate} = props
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    
    const [isOpen, setIsOpen] = useState(false);

    const isDateDisabled = date => {
        // Disable dates before the current date
        return date < new Date();
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate) => {
        checkin_date = formatDate(selectedDate);
        localStorage.setItem("Checkin", checkin_date)
        setcheckinDate(selectedDate);

        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
        const checkout_date = formatDate(nextDay);
        localStorage.setItem("Checkout", checkout_date);
        setcheckoutDate(nextDay)
        setIsOpen(false); // Close the calendar after selecting a date
        props.toggleDiv()
    };

    // Extracting date, day, month, and year from the selected date
    const selectedDay = checkinDate.getDate();
    const selectedMonth = checkinDate.toLocaleString('default', { month: 'long' });
    const selectedYear = checkinDate.getFullYear();
    let checkin_date = formatDate(checkinDate)
    localStorage.setItem("Checkin", checkin_date)

    return (
        <div className=''>
            <button className='bg-[#181A1D] gap-2 flex px-4 py-[14px] rounded-2xl outline-none' 
            onClick={handleClick} 
            // style={{ background: props.bg_color }}
            >
                {/* We have to customize this color, this color will come form backend */}
                <span className='text-light'>{checkinDate.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <span className='date text-light'>{selectedDay}</span>
                <span className='text-light'>{selectedMonth}</span>
                <span className='text-light'>{selectedYear}</span>
            </button>
            {isOpen && (
                <div className='rndClndr'>
                    <Calendar onChange={handleDateChange} value={checkinDate} tileDisabled={({ date }) => isDateDisabled(date)} />
                </div>
            )}

        </div>
    );
};

export default FullCalendar;

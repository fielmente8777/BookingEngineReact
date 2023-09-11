import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const FullCalendar1 = (props) => {
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
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);

    const isDateDisabled = date => {
        // Disable dates before the current date
        return date < new Date();
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate) => {
        checkout_date = formatDate(selectedDate);
        localStorage.setItem("Checkout", checkout_date)
        setDate(selectedDate);
        setIsOpen(false); // Close the calendar after selecting a date
    };

    // Extracting date, day, month, and year from the selected date
    const selectedDay = date.getDate();
    const selectedMonth = date.toLocaleString('default', { month: 'long' });
    const selectedYear = date.getFullYear();
    let checkout_date = formatDate(date)
    localStorage.setItem("Checkout", checkout_date)

    return (
        <div className='caldiv'>
            <button className='datebtn' onClick={handleClick} style={{ background: props.bg_color }}>
                {/* We have to customize this color, this color will come form backend */}
                <span className='text-light'>{date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
                <span className='date text-light' >{selectedDay}</span>
                <span className='text-light'>{selectedMonth}</span>
                <span className='text-light'>{selectedYear}</span>
            </button>
            {isOpen && (
                <div className='rndClndr '>
                    <Calendar onChange={handleDateChange} value={date}
                        tileDisabled={({ date }) => isDateDisabled(date)} />
                </div>
            )}

        </div>
    );
};

export default FullCalendar1;

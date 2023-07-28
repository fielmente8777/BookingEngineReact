import React, { useState } from 'react';
import Cards from './Cards';
import Contactinfo from './Contactinfo';

const Accordion = () => {
    const accordionData = [
        { title: 'Section 1', content: <Cards /> },
        { title: 'Section 2', content: <Contactinfo /> },
        { title: 'Section 3', content: 'Content of section 3' },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const handleSectionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            {accordionData.map((section, index) => (
                <div key={index}>
                    <button onClick={() => handleSectionClick(index)}>{section.title}</button>
                    {activeIndex === index && <div>{section.content}</div>}
                </div>
            ))}
        </div>
    );
};

export default Accordion;

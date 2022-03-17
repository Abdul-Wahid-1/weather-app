import React from 'react'
import './index.css';

function DateLocation() {
    return (
        <div className='column'>
            <span> {new Date().toLocaleString("en-US", { day : '2-digit'})} {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()}</span>
            <h1 >City</h1>
            <span>Country</span>
        </div>
    )
}

export default DateLocation
import React from 'react'
import './index.css';

function CurrentWeather({ low, high, icon, description, feelsLike }) {
    return (
        <div className='bg-redish roundedCorners'>
            <div className='column left'>
                <h2 >
                    <span >{ low }</span>
                    <span >{ high }</span>
                </h2>
                <div className='column'>
                    <img  src={icon} alt="icon" className='cwIcon'/>
                    <div className='capitalize'>{ description }</div>
                </div>
            </div>
            <div className='column right'>
                <h1  >{new Date().toLocaleString("en", { weekday: "short" })}</h1>
                <h3 >{ feelsLike }</h3>
            </div>
        </div>
    )
}

export default CurrentWeather
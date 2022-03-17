import React from 'react'
import './index.css';

function Forecast({forecasts, loaded}) {

    return (
        <div className='bg-pinkish roundedCorners'>
            <span >7-day forecast</span>
            <div className='row'>
                {loaded ? 
                    forecasts.map((forecast) => {
                        return (
                            <div >
                                <img src={forecast[1]} alt="icon" />
                                <div>{forecast[0]}</div>
                            </div>
                        )
                        
                    }):null
        
                }
            </div>
        </div>
    )
}

export default Forecast
import React from 'react'
import './index.css';

function FurtherInfo({pChance, uvIndex, windSpeed}) {
    return (
        <div >
            <div className='column left'>
                <button >Chance pf precipitation &gt;</button>
                <span>{ pChance }</span>
                <button  >UV index &gt;</button>
                <span >{ uvIndex }</span>
            </div>
            <div className='column right'>
            <div><button >&gt; Recommendation</button><br/>Raincoat</div>
            <button>&gt; Wind speed</button>
                <span>{ windSpeed }</span>
            </div>
        </div>
    )
}

export default FurtherInfo
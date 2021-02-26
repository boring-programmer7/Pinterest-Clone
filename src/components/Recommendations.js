import React from 'react'
import "./Mainboard.css"
import Pin from './Pin'



function Recommendations({pins}) {
    return (
         <div className="board_wrapper">
            <div className="gridCentered">
                {pins.map(pin => (
                    <Pin
                        key={pin.id}
                        id={pin.id}
                        imageUrl={pin.urls?.regular}
                        desc={pin.alt_description}
                    
                    />
                ))}
                 
            </div>
            
        </div>
    )
}

export default Recommendations

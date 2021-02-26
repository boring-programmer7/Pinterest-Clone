import React from 'react'
import "./Mainboard.css"
import Pin from './Pin'
import {useStateValue} from "../StateProvider"


function Mainboard() {
    const [{ pins }] = useStateValue()
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

export default Mainboard

import React from 'react'
import { Link } from 'react-router-dom';

function Pin({imageUrl,desc, id}) {
    
    return (
        <div className="pin_wrapper">
            
            <Link to={`/pin/${id}`}>
                <div className="pin_container">

                 <img src={imageUrl} alt={desc}></img>
                
                </div>
                
            </Link>
                
            
        </div>
    )
}

export default Pin

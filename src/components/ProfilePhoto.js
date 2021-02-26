import React,{useState,useEffect} from 'react'
import db from "../firebase"
import Recommendations from './Recommendations'


function ProfilePhoto({ user }) {
    const [savedPins, setSavedPins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            db.collection(user.uid).limit(1000)
                .onSnapshot(snapshot => {
                setSavedPins(snapshot.docs.map(doc =>
                 (doc.data())
                ));
            setLoading(false)
        })
    }
       return
    }, [user])
    

    return (
        <>
         <div className="profile__photo">
            <img src={user?.photoURL} alt={user?.displayName}></img>
                <h1>{user?.displayName}</h1>
                <span>{savedPins?.length} Pins guardados</span>
        </div>
        <div className="saved__Pins">
                <h3> Tus Pins guardados</h3>
                {loading ? (<></>) : (
                     <Recommendations pins={savedPins}/>
                )}
              
        </div>   

        </>
        
    )
}

export default ProfilePhoto

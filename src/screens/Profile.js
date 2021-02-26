import React,{useState,useEffect} from 'react'
import './Profile.css'
import Header from "../components/Header"
import firebase from "firebase"
import ProfilePhoto from '../components/ProfilePhoto'
import { useHistory } from "react-router-dom";
import unsplash from "../api/unsplash"
import {useStateValue} from "../StateProvider"

function Profile() {

   

  const [user, setUser] = useState()
  const history = useHistory();
  const [ {},dispatch ] = useStateValue()

  const getImages = (term) => {
        return unsplash.get("https://api.unsplash.com/search/photos", {
            params: {
                query: term,
                per_page:15,
            }
        })
    }
    const onSearchSubmit = (term) => {
      getImages(term).then((res) => {
          let results = res.data.results
          let newPins = [...results]
          dispatch({
              type: 'SET_PINS',
              pins:newPins,
          })
          history.push("/")
      })
  }

      useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setUser(user)
  } else {
    setUser(null)
    history.push("/")
  }
});
  },[])

    return (
        <div className="profile">
        <Header user={user} onSubmit={onSearchSubmit}/>
            <ProfilePhoto user={user} />
        </div>
    )
}

export default Profile

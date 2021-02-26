import './App.css';
import Feed from './screens/Feed';
import Login from './screens/Login';
import { useState, useEffect } from 'react'
import firebase from "firebase"


function App() {
  const [user, setUser] = useState()
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setUser(user)
    setLoading(false)
  } else {
    setUser(null)
        setLoading(false)

  }
});
  },[])


  return (
    <div className="app">
      {loading ? (
        <div></div>
      ):
        (
        <>
    {!user ? (
        <Login/>
      ) : (
          <Feed user={user}/>
      )}
          </>
    )}



     
      
    </div>
  );
}

export default App;

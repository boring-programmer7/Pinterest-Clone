import React,{useEffect} from 'react'
import Header from '../components/Header'
import Mainboard from '../components/Mainboard'
import unsplash from "../api/unsplash"
import {useStateValue} from "../StateProvider"

function Feed({user}) {
    const [{ pins }] = useStateValue()
    const [{ },dispatch ] = useStateValue()
 
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
                pins:newPins
            })
        })
    }

    const getNewPins = () => {
        let promises = []
        let pinData = []
        let pinsToSearch = ['dogs', 'cats', 'art','animals']
        
        pinsToSearch.forEach((pinItem)=> {
            promises.push(
                getImages(pinItem).then((res) => {
                    pinData=pinData.concat(res.data.results)
            })
        )
        })
        Promise.all(promises).then(() => {
            pinData.sort((a, b) => {
                return 0.5-Math.random()
            })
            dispatch({
                type: 'SET_PINS',
                pins:pinData,
            })

        })
    }

    useEffect(() => {
        if (pins.length ===0) {
            getNewPins()
        }
       
    },[])


    return (
        <div className="feed">
            <Header user={user} onSubmit={onSearchSubmit} />
            <Mainboard/>

                 
        </div>
    )
}

export default Feed

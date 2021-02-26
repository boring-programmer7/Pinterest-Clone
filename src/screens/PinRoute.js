import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import unsplash from "../api/unsplash"
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper, Typography } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import { useHistory } from "react-router-dom";
import {useStateValue} from "../StateProvider"
import Recommendations from '../components/Recommendations';
import db from "../firebase"
import firebase from "firebase"
const useStyles = makeStyles((theme)=>({
  root: {
        
        display: 'flex',
        flexDirection: isMobile?'column': 'row',
        marginBottom: '20px',
        maxWidth: isMobile?'100%':'800px',
        maxHeight: isMobile ? null : 'auto',
        minHeight: 350,
        padding:20
  },
  media: {
      height: isMobile?300:'auto',
      width: isMobile?'100%':350,
      objectFit: 'cover',
      paddingBottom: isMobile ? '20px' : 0,
    },
    data: {
        padding:'20px',
        marginLeft:isMobile?0: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'space-between' : 'space-around',
        minHeight:isMobile?'250px':null
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignContent:'center'
    },
    small: {
    width: theme.spacing(3),
        height: theme.spacing(3),
   
    },
    large: {
    width: theme.spacing(5),
        height: theme.spacing(5),
   
    },
    button: {
        padding: '10px 20px 10px 20px',
        borderRadius: 14,
        border: 'none',
        fontWeight:600,
    }
})
)



function PinRoute(props) {
    const classes = useStyles();
    const id = props.match.params.id
    const [data, setData] = useState()
    const history = useHistory();
    const [ {},dispatch ] = useStateValue()
    const [colData, setColData] = useState()
    const [saved, setSaved] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setUser(user)
  } else {
    setUser(null)
  }
});
  },[])


    
     const getImages = (term) => {
        return unsplash.get("https://api.unsplash.com/search/photos", {
            params: {
                query: term,
                per_page:15,
            }
        })
    }

    const getCollection = (id) => {  
        return unsplash.get(`https://api.unsplash.com//collections/${id}/photos`, {
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



    const _title = (text) => {
        try {
            return text.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ')
        } catch {
            return text
        }
        
    }
    const getImage = (id) => {  
        return unsplash.get(`https://api.unsplash.com/photos/${id}`, {
        })
    }

    const addToCollection = () => {
        db.collection(user.uid).doc(data.id).set(data).then((res) => {
            setSaved(true)
            //alert("Imagen Guardada Correctamente!")
            
        }).catch((error) => {
            alert("Ocurrió un error",error.message)
        })
    }


    useEffect(() => {
        getImage(id).then((res) => {
            
            setData(res.data)
            getCollection(res.data.related_collections.results[0]?.id).then((colRes) => {
            
                setColData(colRes.data)
            })
        })
        return () => { 
        }
    }, [id])

    useEffect(() => {
        
        if (user) {
            var docRef = db.collection(user.uid).doc(id);
            docRef.get().then((doc) => {
            if (doc.exists) {
                setSaved(true)
            } else {
                // doc.data() will be undefined in this case
                setSaved(false)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        }

        
        return ()=>{}
    },[user,id])



    return (
        <div className="feed">
            <Header user={user} onSubmit={onSearchSubmit} />
            <div className="container">
                {data && (
                    <Paper elevation={3} className={classes.root}> 
                        <div className={classes.imageContainer}>
                            
                            <a href={data.links.download} style={{width:'100%',height:'100%',display:'flex'}}>
                             <img src={data.urls.regular} alt={data.alt_description} className={classes.media} />     
                            </a>           
               
            </div>
            
                        <div className={classes.data}>
                            {user && (
                               <div className="save__button__container">
                                {saved ? (
                                    <button className={classes.button}>Guardado</button>
                                ):(
                                    <button onClick={addToCollection} className="save__button">Guardar</button>
                                )}
                              
                            </div> 
                            )}
                            




                <a href={data.links.download}>https://unsplash.com/photos</a>
                <Typography
                    gutterBottom
                    variant="h4"
                    component="h2"
                    align="center">
                    {_title(data.alt_description)}
                            </Typography>
                            
                  <div className="user__pin">
                                <Avatar className={classes.large} src={data.user.profile_image.small}></Avatar>
                                <div className="user__info">
                                    <Typography
                    style={{fontWeight: 600, marginLeft:10 }}  
                    color="textPrimary"
                    display="block"
                                    align="center"

                                >
                        {data.user.username}
                                    </Typography>
                                 <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{marginLeft:10}}
                    align="justify">
            {data.user.total_photos} fotos
                            </Typography>   
                                </div>
                                <div style={{flex:1}}></div>
                                <button className={classes.button}>Seguir</button>
                    
                                
                </div>          
                
                
                
            </div>
           
        </Paper>
                )}
                
            </div>
            
            {colData && (
                <>
                    <h3 style={{textAlign:'center'}}>Más como esto</h3>
                    <Recommendations pins={colData}/>
                </>
                
        )}

        </div>
    )
}

export default PinRoute

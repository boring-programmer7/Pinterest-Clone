import { Avatar, Button, IconButton } from '@material-ui/core'
import React,{useState} from 'react'
import "./Header.css"
import PinterestIcon from '@material-ui/icons/Pinterest';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase"
import { useHistory } from "react-router-dom";
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    },
  nested: {
    paddingLeft: theme.spacing(4),
    },
   expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function Header({onSubmit,user}) {
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(false);


    const onSearchSubmit = (e) => {
        e.preventDefault()
        onSubmit(search)
        setSearch("")
       
    }
    const handleExpandClick = () => {
    setExpanded(!expanded);
  };
    
    const logout = () => {
        firebase.auth().signOut().
            then(() => {
            // Sign-out successful.
            history.push("/")
            })
            .catch((error) => {
            // An error happened.
            console.log(error.message)});
}

    return (
        <div className="header">
            <div className="header_routes">
                <IconButton onClick={()=>{history.push("/")}}>
                    <PinterestIcon
                        style={{ color: '#e60023', fontSize:'32px',cursor:'pointer' }}
                    
                    />
                </IconButton>
                <a className="header_links home" href="/">
                Inicio
                </a>

               
            </div>
            <div className="header_search">
                <div className="searchbar_wrapper">
                    <IconButton>
                     <SearchIcon/>
                </IconButton>
               
                <form>
                        <input
                            className="input_search"
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        
                        ></input>
                        <button
                            type="submit"
                            onClick={(e)=>onSearchSubmit(e)}
                            style={{ display: 'none' }}></button>
                </form>
                </div>
                
            </div>
            <div className="header_icons">
                <IconButton>
                    <NotificationsIcon/>
                </IconButton>
                <IconButton onClick={() => { history.push("/profile") }}>
                    <Avatar className={classes.small} alt={user?.displayName} src={user?.photoURL} />
                </IconButton>
                <div style={{marginRight:20}}>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
                </IconButton>
                 <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Button onClick={logout}>Cerrar Sesión</Button>
      </Collapse>

                </div>
                
                


               
              
               

              
            </div>
        </div>
    )
}

export default Header

import React,{useContext, useState} from 'react';
import {AppBar, Toolbar, Typography, IconButton, Badge, Avatar, Select, Button} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../assets/logo.png';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import {AuthContext} from '../Firebase/currentUser';
import {auth} from '../Firebase/firebase'



const Navbar = () => {
    const classes = useStyles();
    const {currentUser} = useContext(AuthContext);

    //  Menu State
    const[menu, setMenu] = useState(null);
    const isMenuOpen = Boolean(menu);
    const handleMenuClose = () =>{
        setMenu(null);
    }
    const handleMenuopen = (event) =>{
        setMenu(event.currentTarget);
    }

    // Accordian state
    const[accord, setaccord] = useState(null);
    const AccordianHandler = (event) =>{
        setaccord(event.currentTarget);
    }
    const onClose = () =>{
        setaccord(null);
    }
    
    const logout=()=>{
           auth.signOut()
    }

    const MenuId = 'menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={menu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={MenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="home" color="inherit" component={Link} to="/">
              <p className={classes.text}>Home</p>
          </IconButton>
          
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="buy" color="inherit" component={Link} to="/buy">
              <p className={classes.text}>Buy</p>
          </IconButton>
          
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="sell" color="inherit" component={Link} to="/sell">
              <p className={classes.text}>Sell</p>
          </IconButton>
          
        </MenuItem>
        <MenuItem>
      
            {currentUser ? <>
            <div onClick={AccordianHandler} className={classes.center}>
                    <Avatar>G</Avatar>
                    <ArrowDropDownIcon/>
            </div>
            <Menu
                    id="simple-menu"
                    anchorEl={accord}
                    keepMounted
                    open={Boolean(accord)}
                    onClose={onClose}
                >
                    <MenuItem onClick={onClose}>
                        <p className={classes.text}>My Ads</p>
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <p className={classes.text}>Logout</p>
                    </MenuItem>
                    <MenuItem onClick={onClose} component={Link} to="/signup">
                        <p className={classes.text}>Sign in</p>
                    </MenuItem>
            </Menu>
            </> : <Button variant="contained" component={Link} to="/login">Login</Button>}
        </MenuItem>
      </Menu>
    );

    return (
        <div>
            <AppBar position="fixed" color="primary" className={classes.appbar}>
                <Toolbar >
                <img src={Logo} alt="Logo" className={classes.image}/>
                <div className={classes.grow}/>
                    <div className={classes.mobileversion}>
                        <IconButton aria-label="Menu" aria-controls={MenuId} aria-haspopup="true" onClick={handleMenuopen} color="inherit">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <div className={classes.desktopversion}>
                      <IconButton aria-label="Home" color="inherit" component={Link} to="/">
                            <p className={classes.text}>Home</p>
                        </IconButton>
                        <IconButton aria-label="Buy" color="inherit" component={Link} to="/buy">
                            <p className={classes.text}>Buy</p>
                        </IconButton>
                        <IconButton aria-label="Sell" color="inherit" component={Link} to="/sell">
                            <p className={classes.text}>Sell</p>
                        </IconButton>
                        <div className={classes.accordwrapper}>
                        {currentUser ? <>
                            <div onClick={AccordianHandler} className={classes.center}>
                                <Avatar>G</Avatar>
                                <ArrowDropDownIcon/>
                            </div>
                            <Menu
                                    id="simple-menu"
                                    anchorEl={accord}
                                    keepMounted
                                    open={Boolean(accord)}
                                    onClose={onClose}
                                >
                                    <MenuItem onClick={onClose}>
                                        <p className={classes.text}>My Ads</p>
                                    </MenuItem>
                                    <MenuItem onClick={logout}>
                                        <p className={classes.text}>Logout</p>
                                    </MenuItem>
                                    <MenuItem onClick={onClose} component={Link} to="/signup">
                                         <p className={classes.text}>Sign in</p>
                                    </MenuItem>
                            </Menu>
                            </> : <Button variant="contained" component={Link} to="/login">Login</Button>}
                            
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    )
}

export default Navbar

import {useEffect, useState} from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import {connect} from "react-redux";
import {logoutUser, addToDeals, removeFromDeals} from "../store/action";
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AllDeals from "../components/AllDeals";
import {Grid} from "@mui/material";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import {allCart} from "../components/cart";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const Home = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(()=> {
        const user = props.users.find((user) => user.isloggedin);
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        } else {
            setCurrentUser({});
            setIsLoggedIn(false);
            navigate('/login');
        }
    }, [props.users, navigate])
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        const email = currentUser.email;
        props.logoutUser({email});
        const user = props.users.find((user) => user.email === email);
        if (!user.isloggedin) {
            navigate('/login');
        }
    }

    const [open, setOpen] = React.useState(false);
    const [openUserDeals, setOpenUserDeals] = React.useState(false);
    const handleDialogClose = (value) => {
        setOpen(false);
    };

    const onProfileClick = (e) => {
        setOpen(true);
        handleClose();
    }

    const onUserDealsClick = (e) => {
        setOpenUserDeals(true);
        handleClose();
    }

    const handleUserDealsClose = (e) => {
        setOpenUserDeals(false);
    }

    const addToDeals = (email, itemId) => {
        props.addToDeals(email, itemId);
    }

    const removeFromDeals = (itemId) => {
        props.removeFromDeals(currentUser.email, itemId);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    {isLoggedIn && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        }
                                    }}
                            >
                                <MenuItem onClick={onProfileClick}>
                                    <Avatar /> Profile</MenuItem>
                                <MenuItem onClick={onUserDealsClick}>
                                    <Avatar /> My Deals</MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout</MenuItem>
                            </Menu>
                            <Dialog onClose={handleDialogClose} open={open} fullWidth
                                    maxWidth="sm">
                                <DialogTitle>User Profile</DialogTitle>
                                <IconButton
                                    aria-label="close"
                                    onClick={handleDialogClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <DialogContent dividers>
                                    <ListItem disableGutters>
                                        <ListItemText primary="User" secondary={currentUser.name} />
                                    </ListItem>
                                    <ListItem disableGutters>
                                        <ListItemText primary="Email" secondary={currentUser.email} />
                                    </ListItem>
                                </DialogContent>
                            </Dialog>
                            <Dialog onClose={handleUserDealsClose} open={openUserDeals} fullWidth
                                    maxWidth="sm">
                                <DialogTitle>
                                    All deals of user
                                </DialogTitle>
                                <DialogContent dividers>
                                    {allCart.filter(d => currentUser.cart.indexOf(d.id) !== -1).map(item => {
                                        return (
                                            <Grid style={{padding: "10px 0px"}}>
                                            <Card sx={{ display: 'flex' }}>
                                                <Grid container xs={12}>
                                                    <Grid item xs={8}>
                                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                                            <Link underline="none" target="_blank" href={item.whereToBuyLink}>{item.name}</Link>
                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                {item.shortDescription}
                                                            </Typography>
                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                               Price: {item.price} USD
                                                            </Typography>
                                                            <Grid style={{paddingTop: "10px"}}>
                                                                <Button size="small" variant="outlined" onClick={() => removeFromDeals(item.id)}>Remove</Button>
                                                            </Grid>
                                                        </CardContent>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <CardMedia
                                                            component="img"
                                                            sx={{ width: 150, height: 150 }}
                                                            image={item.imageURL}
                                                            alt={item.name}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                            </Grid>
                                        )
                                    })
                                    }
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {isLoggedIn &&
                <AllDeals user={currentUser} addToDeals={addToDeals}/>
            }
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: user => dispatch(logoutUser(user)),
        addToDeals: (email, itemId) => dispatch(addToDeals(email, itemId)),
        removeFromDeals: (email, itemId) => dispatch(removeFromDeals(email, itemId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
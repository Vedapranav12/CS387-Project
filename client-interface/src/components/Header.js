import React, { useContext, useState, Fragment } from 'react';
import GlobalContext from '../providers/GlobalContext';
// import GlobalContextProvider from '../providers/GlobalContextProvider';
import { useNavigate, Link } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const axios = require('axios');

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = globalContext.user;

  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/logout`, null, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          globalContext.setUser({});
          navigate('/');
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error(`Couldn't log the user out: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/*This is a simple Menu 
             Icon wrapped in Icon */}
            <MenuIcon />
          </IconButton>
          {/* The Typography component applies 
           default font weights and sizes */}

          <Typography variant="h6"
            component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}> Restaurant Management System </Link>

          </Typography>
          <Card color="inherit" sx={{ mx: 10 }} style={{ variant: "contained", border: "10px", boxShadow: "none", padding: "10px", borderRadius: 3 }}>
            <Typography>
              {user.Username ? ` Logged in as ${user.Username}, ${user.identifyRole} ` : ' Not logged in '}
            </Typography>
          </Card>
          {user.Username ? (
            <Button color="inherit" onClick={logout}> Logout </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}> Login </Button>
          )}
        </Toolbar>
      </AppBar>
      {/* {
        globalContext.fetchingUser ? (
          <h1 className="loader">Loading...</h1>
        ) : (
          ''
        )
      } */}
    </div >
  )
}

export default Header;
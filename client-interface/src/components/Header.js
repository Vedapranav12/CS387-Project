import React, { useContext, useState, Fragment } from 'react';
import GlobalContext from '../providers/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const axios = require('axios');

const Header = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = globalContext.user;

  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/logout`, null, {
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
          throw new Error()
        }
      })
      .catch((error) => {
        console.error(`Couldn't log the user out: ${error}`)
      })
      .finally(() => {
        setLoading(false)
      });
  }

  return (
    <div>
      {globalContext.fetchingUser ? (
        <h1 className="loader">Loading...</h1>
      ) : (
        <Fragment>
          <h1>{user.id ? `Logged in as ${user.firstname} ${user.surname}` : 'Not logged in'}</h1>
          {user.id ? (
            <Button text="Logout" loading={loading} onClick={logout} />
          ) : (
            <Button text="Login" onClick={() => navigate('/login')} />
          )}

          <Link to="/dashboard">Dashboard</Link>
          <Link to="/change-password">Change Password</Link>
        </Fragment>
      )}
    </div>
  )
}

export default Header;
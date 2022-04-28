import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext.js';
import { Button } from 'react-bootstrap';
const axios = require('axios');

const Login = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    Username: '',
    Passcode: '',
    identifyRole: 'Customer',
  });

  const submitForm = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/login`, formData, {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.user);
          globalContext.setUser(response.data.user);
          navigate('/dashboard');
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setError('Incorrect details');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="page-login">
      <h1 className="title">Login</h1>

      {error && error}

      <input
        type="text"
        name="Username"
        value={formData.Username}
        onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
      />

      <input
        type="password"
        name="Passcode"
        value={formData.Passcode}
        onChange={(e) => setFormData({ ...formData, Passcode: e.target.value })}
      />

      <Button text="Login" loading={loading} onClick={submitForm} />
    </div>
  )
}

export default Login;
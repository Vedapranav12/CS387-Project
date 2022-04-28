import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext';
// import GlobalContextProvider from '../providers/GlobalContextProvider';
import { Button } from 'react-bootstrap';
const axios = require('axios');

const Register = () => {
  const globalContext = useContext(GlobalContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    Address: '',
    Username: '',
    Name: '',
    Contact: '',
    Passcode: '',
    Zip: '',
  });

  const submitForm = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/register`, formData, {
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
        setError('Registration failed');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="page-register">
      <h1 className="title">Register</h1>

      {error && error}

      <input
        type="text"
        name="Name"
        value={formData.Name}
        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
      />

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

      <input
        type="text"
        name="Contact"
        value={formData.Contact}
        onChange={(e) => setFormData({ ...formData, Contact: e.target.value })}
      />

      <input
        type="text"
        name="Address"
        value={formData.Address}
        onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
      />

      <input
        type="text"
        name="Zip"
        value={formData.Zip}
        onChange={(e) => setFormData({ ...formData, Zip: e.target.value })}
      />

      <Button text="Register" loading={loading} onClick={submitForm} />
    </div>
  )
}

export default Register;
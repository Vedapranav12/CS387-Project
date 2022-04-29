import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../providers/GlobalContext';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const axios = require('axios');

const theme = createTheme();
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

  const submitForm = (event) => {
    event.preventDefault();
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
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={submitForm}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="Name"
                label="Name"
                type="text"
                id="name"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="username"
                value={formData.Username}
                onChange={(e) => setFormData({ ...formData, Username: e.target.value })}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.Passcode}
                onChange={(e) => setFormData({ ...formData, Passcode: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Contact"
                label="Contact"
                type="text"
                id="Contact"
                value={formData.Contact}
                onChange={(e) => setFormData({ ...formData, Contact: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Address"
                label="Address"
                type="text"
                id="Address"
                value={formData.Address}
                onChange={(e) => setFormData({ ...formData, Address: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Zip"
                label="Zip"
                type="text"
                id="Zip"
                value={formData.Zip}
                onChange={(e) => setFormData({ ...formData, Zip: e.target.value })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                margin="normal"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {/* 
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

      <Button text="Register" loading={loading} onClick={submitForm} /> */}
    </div>
  )
}

export default Register;
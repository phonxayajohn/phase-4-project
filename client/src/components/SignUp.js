import React, { useState } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const customTheme = createTheme({
  palette: {
    primary: {
      main: '#8a8662',
    },
  },
  background: {
    default: '#b1ac7c',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#b1ac7c',
        },
      },
    },
  },
});

export default function SignUp({ setCurrentUser }) {
  const navigate = useNavigate()
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = signUpData

  function handleSignUpChange(e) {
    const name = e.target.name
    let value = e.target.value

    setSignUpData({
      ...signUpData,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const user = {
      email,
      password
    }

    if (password.length >= 5) {
      fetch('/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          res.json()
            .then(user => {
              setCurrentUser(user)
              navigate('/')
            })
        })
    }
    else {
      return (alert('Password must be at least 6 or more characters'))
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
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
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleSignUpChange} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
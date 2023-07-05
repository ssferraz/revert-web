import React, { useCallback, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Stack,
  Unstable_Grid2 as Grid
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from 'src/hooks/use-auth';

export const AccountProfileDetails = () => {
  const { user, updateUser } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarErrorOpen(false);
  };

  const [values, setValues] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: '',
    confirm: ''
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
  
    if (values.password !== values.confirm) {
      setSnackbarErrorOpen(true);
      return;
    }
  
    try {
      await axios.put(`http://localhost:3001/api/users/${values.id}`, {
        name: values.name,
        email: values.email,
        password: values.password
      });
  
      // Atualiza os dados do usuário no useAuth
      updateUser(values);
  
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setSnackbarErrorOpen(true);
    }
  }, [values, updateUser]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="As informações podem ser editadas" title="Dados Pessoais" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardHeader subheader="Atualizar senha" title="Senha" />
        <CardContent sx={{ pt: 0 }}>
          <Stack spacing={3} sx={{ maxWidth: 800 }}>
            <TextField
              fullWidth
              label="Senha"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Confirmação de senha"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Salvar alterações
          </Button>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert severity="success" onClose={handleSnackbarClose} sx={{ m: 2 }}>
          Usuário atualizado com sucesso!
        </MuiAlert>
      </Snackbar>
      <Snackbar open={snackbarErrorOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert severity="error" onClose={handleSnackbarClose} sx={{ m: 2 }}>
          Senha e confirmação de senha não correspondem.
        </MuiAlert>
      </Snackbar>
    </form>
  );
};

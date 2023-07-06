import Head from 'next/head';
import {
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { useCallback, useMemo, useState, useEffect } from 'react';
import axios from 'axios';

const Page = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/collectionPoints');
        const apiData = response.data;
        setData(apiData);
      } catch (error) {
        console.error('Erro ao obter os dados da API:', error);
      }
    };
  
    fetchData();
  }, []);

  const useCustomers = useMemo(() => {
    return data;
  }, [data]);

  return (
  <>
    <Head>
      <title>
        Pontos de Coleta | Revert
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Pontos de Coleta
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
              </Stack>
            </Stack>
          </Stack>
          
          <Grid
            container
            spacing={3}
          >
            {useCustomers.map((dt) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={dt._id}
              >
                <CompanyCard company={dt} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

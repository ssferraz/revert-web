import PropTypes from 'prop-types';

import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { format } from 'date-fns';

export const CompanyCard = (props) => {
  const { company } = props;
  console.log(company);
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.address}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Criado em {format(new Date(company.createdAt), 'dd/MM/yyyy')}
          </Typography>
        </Stack>
       
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';

import { useAuth } from 'src/hooks/use-auth';

export const AccountProfile = () => {
  const { user } = useAuth();
  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src='/assets/avatars/avatar-blank.png'
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
       
      </Box>
    </CardContent>
 
  </Card>
  );
};
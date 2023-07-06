import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import MapPinIcon from '@heroicons/react/24/solid/MapPinIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Início',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Pontos de Coleta',
    path: '/collectionPoints',
    icon: (
      <SvgIcon fontSize="small">
        <MapPinIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Perfil',
    path: '/profile',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  
];

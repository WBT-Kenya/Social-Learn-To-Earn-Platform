// component
import SvgColor from '../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_twotone-dashboard'),
  },
  {
    title: 'courses',
    path: '/dashboard/courses',
    icon: icon('ic_schema-outline-rounded'),
  },
  {
    title: 'categories',
    path: '/dashboard/categories',
    icon: icon('ic_integrated-circuit'),
  },
  {
    title: 'clients',
    path: '/dashboard/clients',
    icon: icon('ic_outline-people'),
  },
  {
    title: 'chat',
    path: '/chat',
    icon: icon('ic_chat-28-filled'),
  },
  {
    title: 'profile',
    path: '/profile',
    icon: icon('ic_user'),
  },

];

export default navConfig;

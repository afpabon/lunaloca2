import { ADMIN_ROUTES } from '../constants/config';

export const isAdminRoute = route => ADMIN_ROUTES.indexOf(route) >= 0;

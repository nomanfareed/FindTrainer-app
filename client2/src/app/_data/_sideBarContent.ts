import { Role } from '../_model/_Enum/Role';
import {
  _Dashboard_Account_route,
  _Dashboard_Certs_route,
  _Dashboard_Messages_route,
  _Dashboard_Review_route,
  _Dashboard_Stats_route,
  _mainAdmin_Route,
  _maintrainer_route,
  _mainUser_route,
} from './_route';
function properURL(role: Role, url: string) {
  if (role === Role.user) {
    return `${_mainUser_route}/${url}`;
  }
  if (role === Role.trainer) {
    return `${_maintrainer_route}/${url}`;
  }
  if (role === Role.admin) {
    return `${_mainAdmin_Route}/${url}`;
  }
}
export const _UserSideboard = [
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: properURL(Role.user, _Dashboard_Account_route),
  },
  {
    name: 'Messages',
    icon: 'fas fa-envelope',
    route: properURL(Role.user, _Dashboard_Messages_route),
  },
  {
    name: 'Reviews',
    icon: 'fas fa-star',
    route: properURL(Role.user, _Dashboard_Review_route),
  },
];
export const _TrainerSideBoard = [
  {
    name: 'Statics',
    icon: 'fas fa-chart-bar',
    route: properURL(Role.trainer, _Dashboard_Stats_route),
  },
  {
    name: 'Certifications',
    icon: 'fas fa-school',
    route: properURL(Role.trainer, _Dashboard_Certs_route),
  },
  {
    name: 'Messages',
    icon: 'fas fa-envelope',
    route: properURL(Role.trainer, _Dashboard_Messages_route),
  },
  {
    name: 'Reviews',
    icon: 'fas fa-star',
    route: properURL(Role.trainer, _Dashboard_Review_route),
  },
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: properURL(Role.trainer, _Dashboard_Account_route),
  },
];
export const _AdminSideBoard = [
  {
    name: 'Statics',
    icon: 'fas fa-chart-bar',
    route: properURL(Role.admin, _Dashboard_Stats_route),
  },
  {
    name: 'Certifications',
    icon: 'fas fa-school',
    route: properURL(Role.admin, _Dashboard_Certs_route),
  },
  {
    name: 'Messages',
    icon: 'fas fa-envelope',
    route: properURL(Role.admin, _Dashboard_Messages_route),
  },
  {
    name: 'Reviews',
    icon: 'fas fa-star',
    route: properURL(Role.admin, _Dashboard_Review_route),
  },
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: properURL(Role.admin, _Dashboard_Account_route),
  },
];

import { Role } from '../_model/_Enum/Role';
import {
  _dashboardStats_route,
  _editAccount_route,
  _editCertification_route,
  _maintrainer_route,
  _mainUser_route,
  _myMessages_route,
} from './_route';
function properURL(role: Role, url: string) {
  return role === Role.trainer
    ? _maintrainer_route + '/' + url
    : _mainUser_route + '/' + url;
}
export const _UserSideboard = [
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: properURL(Role.user, _editAccount_route),
  },
];
export const _TrainerSideBoard = [
  {
    name: 'Statics',
    icon: 'fas fa-chart-bar',
    route: properURL(Role.trainer, _dashboardStats_route),
  },
  {
    name: 'Account',
    icon: 'fas fa-user-circle',
    route: properURL(Role.trainer, _editAccount_route),
  },
  {
    name: 'Certifications',
    icon: 'fas fa-school',
    route: properURL(Role.trainer, _editCertification_route),
  },
  {
    name: 'Messages',
    icon: 'fas fa-envelope',
    route: properURL(Role.trainer, _myMessages_route),
  },
];

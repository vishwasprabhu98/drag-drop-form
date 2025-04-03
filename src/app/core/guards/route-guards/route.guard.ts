import { CanActivateFn } from '@angular/router';
import { USER_TYPE } from '../../enums/user-type';

export const userGuard: CanActivateFn = (route, state) => {
  const userType = localStorage.getItem('loginType')
  return userType === USER_TYPE.USER || userType === USER_TYPE.ADMIN ? true : false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const userType = localStorage.getItem('loginType')
  return userType === USER_TYPE.ADMIN ? true : false;
};
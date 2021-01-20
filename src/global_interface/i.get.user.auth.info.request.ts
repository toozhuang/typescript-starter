import { Request } from 'express';
import { UserData } from '../user/interface/user.interface';

export interface IGetUserAuthInfoRequest extends Request {
  user: UserData;
}

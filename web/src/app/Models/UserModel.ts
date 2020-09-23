import { Role } from './role.enum';

export class UserModel{
    id:Number;
    fullname:String;
    role:Role;
    token:String;
    email:String;
    password:String;
}
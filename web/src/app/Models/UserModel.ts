import { Role } from './role.enum';

export class UserModel{
    id:Number;
    username:String;
    fullname:String;
    role:Role;
    token:String;
    email:String;
    password:String;
}
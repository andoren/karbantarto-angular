import { Role } from './role.enum';

export class UserModel{
 
    constructor(id:Number,fullname:String,role:Role){
        this.setId(id);
        this.setFullname(fullname);
        this.setRole(role);
    }
    private _fullname:String;
    private _role:Role;
    private _id:Number;
    getFullname():String{
        return this._fullname;
    }
    setFullname(fullname:String):void{
        this._fullname = fullname;
    }
    getRole():Role{
        return this._role;
    }
    setRole(role:Role):void{
        this._role = role;
    }
    getId():Number{
        return this._id;
    }
    setId(id:Number):void{
        this._id = id;
    }
}
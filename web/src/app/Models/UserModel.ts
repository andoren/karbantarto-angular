import { tokenName } from '@angular/compiler';
import { Role } from './role.enum';

export class UserModel{
 
    constructor(id:Number,fullname:String,role:Role){
        this.setId(id);
        this.setFullname(fullname);
        this.setRole(role);
      
    }
    private fullname:String;
    private role:Role;
    private id:Number;
    private token:String;
    getFullname():String{
        return this.fullname;
    }
    setFullname(fullname:String):void{
        this.fullname = fullname;
    }
    getRole():Role{
        return this.role;
    }
    setRole(role:Role):void{
        this.role = role;
    }
    getId():Number{
        return this.id;
    }
    setId(id:Number):void{
        this.id = id;
    }
    getToken():String{
        return this.token;
    }
    setToken(token:String):void{
        this.token = token;
    }
}
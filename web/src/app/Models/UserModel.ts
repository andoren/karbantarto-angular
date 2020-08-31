export class UserModel{
 
    constructor(fullname:String){
        this._fullname = fullname;
    }
    private _fullname:String;

    getFullname():String{
        return this._fullname;
    }
    setFullname(fullname:String):void{
        this._fullname = fullname;
    }
}
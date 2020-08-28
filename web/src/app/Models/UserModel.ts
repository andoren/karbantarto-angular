export class UserModel{
    private _fullname:String;

    getFullname():String{
        return this._fullname;
    }
    setFullname(fullname:String):void{
        this._fullname = fullname;
    }
}
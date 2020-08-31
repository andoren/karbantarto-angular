import{UserModel} from './UserModel';

export class JobModel{
    private _id:Number;
    private _title:String;
    private _description:String;
    private _createdDate:Date;
    private _proceedDate:Date;
    private _doneDate:Date;
    private _owner:UserModel;
    private _worker:UserModel;



    getId():Number{
        return this._id;
    }
    setId(id:Number):void{
        this._id = id;
    }
    setTitle(title:String):void{
        this._title = title;
    }
    getTitle():String{
        return this._title;
    }
    setDescription(description:String):void{
        this._description = description;
    }
    getDescription():String{
        return this._description;
    }
    getProceedDate():Date{
        return this._proceedDate;
    }
    setProceedDate(proceedDate:Date):void{
        this._proceedDate = proceedDate;
    }
    getCreatedDate():Date{
        return this._createdDate;
    }
    setCreatedDate(createdDate:Date):void{
        this._createdDate = createdDate;
    }
    getDoneDate():Date{
        return this._doneDate;
    }
    setDoneDate(doneDate:Date):void{
        this._doneDate = doneDate;
    }
    setOwner(owner:UserModel){
        this._owner = owner;
    }
    getOwner():UserModel{
        return this._owner;
    }
    setWorker(worker:UserModel){
        this._worker = worker;
    }
    getWorker():UserModel{
        return this._worker;
    }
}
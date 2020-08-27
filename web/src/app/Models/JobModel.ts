import{UserModel} from './UserModel';

export class JobModel{
    private _id:Number;
    private _title:String;
    private _description:String;
    private _createdDate:Date;
    private _proceedDate:Date;
    private _doneDate:Date;
    private _owner:UserModel;
    private _isAccapted:boolean;
    private _proceed:boolean;
    private _worker:UserModel;

    getId():Number{
        return this._id;
    }
    setId(id:Number):void{
        this._id = id;
    }
    
}
import{UserModel} from './UserModel';
import{AreaModel} from './AreaModel';
export class JobModel{

     id:Number;
     title:String;
     description:String;
     createdDate:Date;
     proceedDate:Date;
     doneDate:Date;
     owner:UserModel;
     worker:UserModel;
     isDone:boolean;
     area:AreaModel;
}
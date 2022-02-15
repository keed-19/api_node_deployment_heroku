import { Schema, model, connect } from 'mongoose';

// create an interface representing a document in MongoDB

interface User {
    firstName:String,
    middleName:String,
    lastName:String,
    phoneNumber:Number,
    birthday:String,
    email:String,
    password:String,
}

const shema = new Schema<User>({
    firstName:{type:String, required:true},
    middleName:{type:String, required:true},
    lastName:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    birthday:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
})

const UserModel = model<User>('User',shema);

export { UserModel };
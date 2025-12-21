// Objective: Define the structure of the user object.
// The user object is used to store the user details.
export interface Users{
    id:number;
    first_name:string;
    last_name:string;
    dateofbirth:string;
    mobileno:number;
    password:string;
    re_password:string;
    role:string;
    email:string;
    created_on:Date;
    status:number;
    //gender:string;
}

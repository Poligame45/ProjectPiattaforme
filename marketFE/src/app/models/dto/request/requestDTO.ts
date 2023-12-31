import { UserDTO } from "../userDTO/userDTO";

export class RequestDTO {
    id!:number;
    customer!:UserDTO;
    content!:String;
}
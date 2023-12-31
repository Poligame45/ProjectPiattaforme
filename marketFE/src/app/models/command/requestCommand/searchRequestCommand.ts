import { GenericSearchCommand } from "../genericCommand/GenericSearchCommand";

export class SearchRequestCommand extends GenericSearchCommand{
    id?:number;
    customerId?:number;
}
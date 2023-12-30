import { GenericSearchCommand } from "../genericCommand/GenericSearchCommand";

export class SearchOrdersCommand extends GenericSearchCommand {
    id?: number;
    dataAcquistoDa?: string;
    dataAcquistoA?: string;
    totale?: number;
    customerId?: number;
    deleted!:boolean;
}
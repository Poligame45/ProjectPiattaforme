import { GenericSearchCommand } from "../genericCommand/GenericSearchCommand";

export class SearchOrdersCommand extends GenericSearchCommand {
    id?: number;
    dataAcquistoDa?: Date;
    dataAcquistoA?: Date;
    totale?: number;
    customerId?: number;
}
import { GenericSearchCommand } from "../genericCommand/GenericSearchCommand";

export class SearchCommandStoredProduct extends GenericSearchCommand {
    nome?: String;
    descrizione?: String;
    prezzo?: number;
    qta?: number;
    img?: String;
    deleted?: boolean;
}
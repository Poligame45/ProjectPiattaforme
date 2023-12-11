export class Table {
    rows!: Array<Riga>;
    headers!: Array<Header>;
    hasActionsButton!: boolean;


    constructor() {
        this.rows = new Array<Riga>();
        this.headers = new Array<Header>();
    }
}

export class Riga {
    columns!: Array<Column>;

    constructor() {
        this.columns = new Array<Column>();
    }
}

export class Column {
    nome!: string;
    buttons?: Array<ActionButtons>
}
export class Header {
    nome!: string;
}

export class ActionButtons {
    name!: string;
    callBack!: Function;
}
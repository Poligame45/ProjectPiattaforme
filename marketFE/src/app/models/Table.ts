export class Table {
    rows: Array<Riga>;
    headers: Array<Header>;
    hasActionsButton: boolean = false;
    hasEditButton: boolean = false;
    hasDeleteButton: boolean = false;
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
    nome!: any;
    type?: string;
}
export class Header {
    nome!: string;
}

export class ActionButtons {
    name!: string;
    callBack!: Function;
}
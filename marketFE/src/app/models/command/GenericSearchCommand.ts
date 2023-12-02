export class GenericSearchCommand{
    current!:number;
    take!:number;

    constructor(){
        this.current = 0;
        this.take = 10;
    }
}
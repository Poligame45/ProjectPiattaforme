export class PaginatorModel{
    hasNext!:boolean;
    hasPrevious!:boolean;
    current: number = 0;
    take: number = 10;
}
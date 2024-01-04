import { GenericSearchCommand } from "../models/command/genericCommand/GenericSearchCommand";

export abstract class Utility {

    async changePaginatorValue(command: GenericSearchCommand, event: any, totale?: number) {
        switch (event) {
            case 1: {
                return await this.goToFirstPage(command);
            }
            case 2: {
                return await this.goToPreviousPage(command);
            }
            case 3: {
                return await this.goToNextPage(command, totale);
            }
            case 4: {
                return await this.goToLastPage(command, totale);
            }
            default: {
                return command.current;
            }
        }
    }

    async goToLastPage(command: GenericSearchCommand, totale?: number) {
        if (!totale) return command.current;
        if(totale <= command.take) return command.current;
        if(totale! % command.take === 0){
            command.current = Math.floor(totale! / command.take) - 1;
        }else if(totale! % command.take !== 0){
        command.current = Math.floor(totale! / command.take) ;

        }
        return command.current;
    }

    async goToNextPage(command: GenericSearchCommand, totale?: number) {
        if (!totale) return command.current;
        if (command.take < totale / (command.current + 1)) {
            command.current = command.current + 1;
        } else {
            return command.current;
        }
        return command.current;
    }
    async goToPreviousPage(command: GenericSearchCommand) {
        if (command.current === 0) return 0;
        command.current = command.current - 1;
        return command.current;
    }

    async goToFirstPage(command: GenericSearchCommand) {
        if (command.current == 0) return 0;
        command.current = 0;
        return command.current;
    }
    abstract changePageSize(event: any):any;
}
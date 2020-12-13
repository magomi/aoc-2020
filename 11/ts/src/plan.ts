export class Seat {
    public isSeat: boolean;
    public isOccupied: boolean;

    constructor(isSeat:boolean, isOccupied:boolean) {
        this.isSeat = isSeat;
        this.isOccupied = isOccupied;
    }

    public toString():string {
        return `(isSeat = ${this.isSeat}, isOccupied = ${this.isOccupied})`;
    }

    public equals(other:Seat):boolean {
        if (this.isSeat == other.isSeat && this.isOccupied == other.isOccupied) {
            return true;
        }
        return false;
    }
} 

export class Position {
    public x:number;
    public y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public toString():string {
        return `(x = ${this.x}, y = ${this.y})`;
    }

    public equals(other:Position):boolean {
        if (this.x == other.x && this.y == other.y) {
            return true;
        }
        return false;
    }
}

export class Plan {
    positions = new Map<Position, Seat | undefined>();
    height:number = 0;
    width:number = 0;

    constructor(data:string[]) {
        for (var i = 0; i < data.length; i++) {
            var line = data[i]
            for (var j = 0; j < line.length; j++) {
                if (line[j] == "L") {
                    this.setSeatAt(j, i, new Seat(true, false));
                } else if (line[j] == "#") {
                    this.setSeatAt(j, i, new Seat(true, true));
                } else {
                    this.setSeatAt(j, i, new Seat(false, false));
                }
            }
        }
    }

    getHeight():number {
        return this.height;
    }

    getWidth():number {
        return this.width;
    }

    getSeatAt(x:number, y:number):Seat | undefined {
        let foundSeat = undefined;
        this.positions.forEach((seat: Seat | undefined, position: Position) => {
            if (position.x == x && position.y == y) {
                foundSeat = seat;
            }
        });
        return foundSeat;
    }

    setSeatAt(x:number, y:number, seat:Seat | undefined) {
        if (this.width < x + 1) {
            this.width = x + 1;
        }
        if (this.height < y + 1) {
            this.height = y + 1;
        }
        let position = new Position(x, y);
        this.positions.set(position, seat);
    }

    calcOccupiedNeighbours(x:number, y:number):number {
        let occupiedNeighbours = 0;
        for (var i = x - 1; i <= x + 1; i ++) {
            for (var j = y - 1; j <= y + 1; j ++) {
                if (i >= 0 && i < this.getWidth() && j >= 0 && j < this.getHeight()) {
                    if (!(i == x && j == y)) {
                        const seat = this.getSeatAt(i, j);
                        if (seat != undefined && seat.isOccupied) {
                            occupiedNeighbours ++;
                        }
                    }
                }
            }
        }
        return occupiedNeighbours;
    }

    calcVisibleOccupiedNeighbours(x:number, y:number):number {
        let visibleOccupiedNeighbours = 0;

        // up 
        for (var j = y-1; j >= 0; j --) {
            let seat = this.getSeatAt(x, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // up/right
        for (var i = x+1, j = y-1; i < this.getHeight() && j >= 0; i ++, j --) {
            let seat = this.getSeatAt(i, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // right 
        for (var i = x+1; i < this.getWidth(); i ++) {
            let seat = this.getSeatAt(i, y)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // down/right
        for (var i = x+1, j = y+1; i < this.getWidth() && j < this.getHeight(); i ++, j ++) {
            let seat = this.getSeatAt(i, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // down
        for (var j = y+1; j < this.getHeight(); j ++) {
            let seat = this.getSeatAt(x, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // down/left
        for (var i = x-1, j = y+1; i >= 0 && j < this.getHeight(); i --, j ++) {
            let seat = this.getSeatAt(i, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // left 
        for (var i = x-1; i >= 0; i --) {
            let seat = this.getSeatAt(i, y)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        // up/left
        for (var i = x-1, j = y-1; i >= 0 && j >= 0; i --, j --) {
            let seat = this.getSeatAt(i, j)
            if (seat != undefined && seat.isSeat && !seat.isOccupied) {
                break;
            }
            if (seat != undefined && seat.isOccupied) {
                visibleOccupiedNeighbours ++;
                break;
            }
        }

        return visibleOccupiedNeighbours;
    }

    calcNextGeneration():Plan {
        let nextGenenerationPlan = new Plan([]);
        for (var x = 0; x < this.getWidth(); x++) {
            for (var y = 0; y < this.getHeight(); y++) {
                let seat = this.getSeatAt(x, y);
                if (seat != undefined && seat.isSeat && !seat.isOccupied && this.calcOccupiedNeighbours(x, y) == 0) {
                    nextGenenerationPlan.setSeatAt(x, y, new Seat(true, true));
                } else if (seat != undefined && seat.isOccupied && this.calcOccupiedNeighbours(x, y) >= 4) {
                    nextGenenerationPlan.setSeatAt(x, y, new Seat(true, false));
                } else {
                    nextGenenerationPlan.setSeatAt(x, y, seat);
                }
            }
        }
        return nextGenenerationPlan;
    }

    calcNextGenerationNew():Plan {
        let nextGenenerationPlan = new Plan([]);
        for (var x = 0; x < this.getWidth(); x++) {
            for (var y = 0; y < this.getHeight(); y++) {
                let seat = this.getSeatAt(x, y);
                if (seat != undefined && seat.isSeat && !seat.isOccupied && this.calcOccupiedNeighbours(x, y) == 0) {
                    nextGenenerationPlan.setSeatAt(x, y, new Seat(true, true));
                } else if (seat != undefined && seat.isOccupied && this.calcVisibleOccupiedNeighbours(x, y) >= 5) {
                    nextGenenerationPlan.setSeatAt(x, y, new Seat(true, false));
                } else {
                    nextGenenerationPlan.setSeatAt(x, y, seat);
                }
            }
        }
        return nextGenenerationPlan;
    }

    isSame(other:Plan):boolean {
        let isSame = true
        other.positions.forEach((otherSeat: Seat | undefined, position: Position) => {
            let thisSeat = this.getSeatAt(position.x, position.y);
            if (thisSeat == undefined || otherSeat == undefined || !otherSeat.equals(thisSeat)) {
                isSame = false; 
            }
        });

        this.positions.forEach((thisSeat: Seat | undefined, position: Position) => {
            let otherSeat = other.getSeatAt(position.x, position.y);
            if (otherSeat == undefined || thisSeat == undefined || !thisSeat.equals(otherSeat)) {
                isSame = false; 
            }
        });

        return isSame;
    } 

    public toString():string {
        let str = "";
        for (var y = 0; y < this.getHeight(); y++) {
            for (var x = 0; x < this.getWidth(); x++) {
                let element = this.getSeatAt(x, y);
                if (element != undefined && !element.isSeat) {
                    str = str + ".";
                } else {
                    if (element != undefined && element.isOccupied) {
                        str = str + "#";
                    } else {
                        str = str + "L";
                    }
                }
            }
            str = str + "\n";
        }
        return str;
    }

    public countOccupiedSeats():number {
        let cnt = 0;
        for (var x = 0; x < this.getWidth(); x++) {
            for (var y = 0; y < this.getHeight(); y++) {
                let seat = this.getSeatAt(x, y);
                if (seat != undefined && seat.isOccupied) {
                    cnt ++;
                }
            }
        }
        return cnt;
    }
}
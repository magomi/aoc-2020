import * as fs from "fs";

export enum Direction {
    NORTH = "NORTH",
    EAST = "EAST",
    SOUTH = "SOUTH",
    WEST = "WEST" 
}

export enum Command {
    N = "N",
    E = "E",
    S = "S",
    W = "W",
    L = "L",
    R = "R",
    F = "F"
}

export class NavStep {
    public command:Command;
    public amount:number;

    constructor(command:Command, amount:number) {
        this.command = command;
        this.amount = amount;
    }

    toString():string {
        return `[NavStep(command=${this.command}, ammount=${this.amount})]`;
    }
}

export class NavStepBuilder {
    private readonly _navStep: NavStep;
  
    constructor() {
        this._navStep = new NavStep(Command.E, 0);
    }
  
    fromString(raw:string): NavStepBuilder {
        var commandStr = raw.substr(0, 1);
        var ammount = Number(raw.substr(1));
        if (commandStr == "L" || commandStr ==  "R" || commandStr ==  "F" || commandStr ==  "N"  || commandStr ==  "E" || commandStr ==  "S" || commandStr ==  "W") {
            this._navStep.command = Command[commandStr];
            this._navStep.amount = ammount;
        }
        return this;
    }
    
    build(): NavStep {
        return this._navStep;
    }
}

export class Position {
    public x:number;
    public y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    toString():string {
        return `[Position(x=${this.x}, y=${this.y})]`;
    }
}

export class Crusade {
    public start:Position;
    public current:Position;
    public navSteps:NavStep[];
    public direction:Direction;

    constructor(start:Position, direction:Direction) {
        this.start = start;
        this.current = this.start;
        this.navSteps = [];
        this.direction = direction;
    }

    navigate(navStep:NavStep) {
        this.navSteps.push(navStep);
        if (navStep.command == Command.N || navStep.command == Command.E || navStep.command == Command.S || navStep.command == Command.W) {
            this.moveInDirection(navStep);
        } else if(navStep.command == Command.L || navStep.command == Command.R) {
            this.turn(navStep);
        } else if (navStep.command == Command.F) {
            this.moveForward(navStep);
        }
    }

    moveForward(navStep:NavStep) {
        var newPosition = this.current;
        if (this.direction == Direction.NORTH) {
            newPosition = new Position(this.current.x, this.current.y - navStep.amount);
        } else if (this.direction == Direction.EAST) {
            newPosition = new Position(this.current.x + navStep.amount, this.current.y);
        } else if (this.direction == Direction.SOUTH) {
            newPosition = new Position(this.current.x, this.current.y + navStep.amount);
        } else if (this.direction == Direction.WEST) {
            newPosition = new Position(this.current.x - navStep.amount, this.current.y);
        }
        this.current = newPosition;
    }

    turn(navStep:NavStep) {
        if (this.direction == Direction.NORTH) {
            if (navStep.command == Command.R) {
                if (navStep.amount == 90) {
                    this.direction = Direction.EAST;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.SOUTH;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.WEST;
                }
            } 
            if (navStep.command == Command.L) {
                if (navStep.amount == 90) {
                    this.direction = Direction.WEST;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.SOUTH;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.EAST;
                }
            } 
        } else if (this.direction == Direction.EAST) {
            if (navStep.command == Command.R) {
                if (navStep.amount == 90) {
                    this.direction = Direction.SOUTH;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.WEST;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.NORTH;
                }
            } 
            if (navStep.command == Command.L) {
                if (navStep.amount == 90) {
                    this.direction = Direction.NORTH;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.WEST;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.SOUTH;
                }
            } 
        } else if (this.direction == Direction.SOUTH) {
            if (navStep.command == Command.R) {
                if (navStep.amount == 90) {
                    this.direction = Direction.WEST;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.NORTH;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.EAST;
                }
            } 
            if (navStep.command == Command.L) {
                if (navStep.amount == 90) {
                    this.direction = Direction.EAST;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.NORTH;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.WEST;
                }
            } 
        } else if (this.direction == Direction.WEST) {
            if (navStep.command == Command.R) {
                if (navStep.amount == 90) {
                    this.direction = Direction.NORTH;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.EAST;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.SOUTH;
                }
            } 
            if (navStep.command == Command.L) {
                if (navStep.amount == 90) {
                    this.direction = Direction.SOUTH;
                }
                if (navStep.amount == 180) {
                    this.direction = Direction.EAST;
                }
                if (navStep.amount == 270) {
                    this.direction = Direction.NORTH;
                }
            } 
        }
    }

    moveInDirection(navStep:NavStep) {
        var newPosition = this.current;
        if (navStep.command == Command.N) {
            newPosition = new Position(this.current.x, this.current.y - navStep.amount);
        } else if (navStep.command == Command.E) {
            newPosition = new Position(this.current.x + navStep.amount, this.current.y);
        } else if (navStep.command == Command.S) {
            newPosition = new Position(this.current.x, this.current.y + navStep.amount);
        } else if (navStep.command == Command.W) {
            newPosition = new Position(this.current.x - navStep.amount, this.current.y);
        }
        this.current = newPosition;
    }

    calcManhattenDistance() {
        return Math.abs(this.current.x) + Math.abs(this.current.y);
    }
}

export class Navigator {
    navSteps: NavStep[] = []
    crusade: Crusade

    constructor(fileName:string) {
        this.crusade = new Crusade(new Position(0, 0), Direction.EAST)
        const file = fs.readFileSync(fileName, 'utf8')
        var lines:string[] = []
        file.split("\n").forEach(line => {
            this.navSteps.push(new NavStepBuilder().fromString(line.trim()).build());
        });
    }

    cruise() {
        this.navSteps.forEach(navStep => {
            this.crusade.navigate(navStep)
        });
    }

    traveledDistance():number {
        return this.crusade.calcManhattenDistance();
    }
}
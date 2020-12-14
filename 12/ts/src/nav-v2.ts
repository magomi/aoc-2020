import { Console } from "console";
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
    public waypoint:Position;
    public current:Position;
    public navSteps:NavStep[];

    constructor(start:Position, waypoint:Position) {
        this.start = start;
        this.waypoint = waypoint;
        this.current = this.start;
        this.navSteps = [];
    }

    navigate(navStep:NavStep) {
        this.navSteps.push(navStep);
        if (navStep.command == Command.N || navStep.command == Command.E || navStep.command == Command.S || navStep.command == Command.W) {
            this.moveWaypoint(navStep);
        } else if(navStep.command == Command.L || navStep.command == Command.R) {
            this.rotateWaypoint(navStep);
        } else if (navStep.command == Command.F) {
            this.move(navStep);
        }
    }
    
    moveWaypoint(navStep:NavStep) {
        var newWaypoint = this.waypoint;
        if (navStep.command == Command.N) {
            newWaypoint.y = this.waypoint.y - navStep.amount;
        } else if (navStep.command == Command.E) {
            newWaypoint.x = this.waypoint.x + navStep.amount;
        } else if (navStep.command == Command.S) {
            newWaypoint.y = this.waypoint.y + navStep.amount;
        } else if (navStep.command == Command.W) {
            newWaypoint.x = this.waypoint.x - navStep.amount;
        }
        this.waypoint = newWaypoint;
    }

    move(navStep:NavStep) {
        var newPosition = new Position(this.current.x + (navStep.amount * this.waypoint.x), this.current.y + (navStep.amount * this.waypoint.y));
        this.current = newPosition;
    }

    rotateWaypoint(navStep:NavStep) {
        if (navStep.command == Command.L) {
            for (var i = 90; i <= navStep.amount; i = i + 90) {
                var newWaypoint = new Position(this.waypoint.y, this.waypoint.x * (-1));
                this.waypoint = newWaypoint;
            }
        } 
        if (navStep.command == Command.R) {
            for (var i = 90; i <= navStep.amount; i = i + 90) {
                var newWaypoint = new Position(this.waypoint.y * (-1), this.waypoint.x);
                this.waypoint = newWaypoint;
            }
        } 
    }

    calcManhattenDistance() {
        return Math.abs(this.current.x) + Math.abs(this.current.y);
    }
}

export class Navigator {
    navSteps: NavStep[] = []
    crusade: Crusade

    constructor(fileName:string) {
        this.crusade = new Crusade(new Position(0, 0), new Position(10, -1))
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
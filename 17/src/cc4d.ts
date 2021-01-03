export class Position {
  x: number;
  y: number; 
  z: number;
  w: number;

  constructor (x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  isEqual(other: Position): boolean {
    return (this.x == other.x && this.y == other.y && this.z == other.z && this.w == other.w);
  }
}

export class World {
  livingCells: Position[] = [];

  generation: number = 0;

  constructor (initialCells?: Position[], worldDesc?: string) {
    if (initialCells != undefined) {
      this.livingCells = initialCells;
    } else if (worldDesc != undefined) {
      var y = 0;
      worldDesc.split("\n").forEach(line => {
        for (var x = 0; x < line.length; x++) {
          if (line[x] == "#") {
            this.livingCells.push(new Position(x, y, 0, 0));
          }
        };
        y ++;
      });
    }
  } 

  toString(): string {
    var worldStr = `---- generation ${this.generation} ----\n`;
    for (var w = this.getWMin(); w <= this.getWMax(); w ++) {
      for (var z = this.getZMin(); z <= this.getZMax(); z ++) {
        worldStr = worldStr + `z = ${z}, w = ${w}\n`;
        for (var y = this.getYMin(); y <= this.getYMax(); y ++) {
          for (var x = this.getXMin(); x <= this.getXMax(); x ++) {
            if (this.isLiving(x, y, z, w)) {
              worldStr = worldStr + "#";
            } else {
              worldStr = worldStr + ".";
            }
          }
          worldStr = worldStr + "\n";
        }
      }
    }
    return worldStr;
  }

  countNeighbours(position: Position): number {
    var count = 0;
    for (var x of [position.x - 1, position.x, position.x + 1]) {
      for (var y of [position.y - 1, position.y, position.y + 1]) {
        for (var z of [position.z - 1, position.z, position.z + 1]) {
          for (var w of [position.w - 1, position.w, position.w + 1]) {
            if (!(position.isEqual(new Position(x, y, z, w))) && this.isLiving(x, y, z, w)) {
              count ++;
            }
          }
        }
      }
    }
    return count;
  }

  isLiving(x: number, y: number, z: number, w: number): boolean {
    for (var livingPosition of this.livingCells) {
      if (livingPosition.isEqual(new Position(x, y, z, w))) {
        return true;
      }
    };
    return false;
  }

  createNextGeneration() {
    var nextGenerationLivingCells: Position[] = []
    for (var x = this.getXMin() - 1; x <= this.getXMax() + 1; x ++) {
      for (var y = this.getYMin() - 1; y <= this.getYMax() + 1; y ++) {
        for (var z = this.getZMin() - 1; z <= this.getZMax() + 1; z ++) {
          for (var w = this.getWMin() - 1; w <= this.getWMax() + 1; w ++) {
            var neighbourCount = this.countNeighbours(new Position(x, y, z, w));
            if (this.isLiving(x, y, z, w) && ((neighbourCount == 2) || (neighbourCount == 3))) {
              nextGenerationLivingCells.push(new Position(x, y, z, w));
            } 
            if (!this.isLiving(x, y, z, w) && (neighbourCount == 3)) {
              nextGenerationLivingCells.push(new Position(x, y, z, w));  
            }
          }
        }
      }
    }
    this.livingCells = nextGenerationLivingCells;
    this.generation ++;
  }

  getXMin(): number {
    return Math.min(...[...this.livingCells].map(position => {return position.x}))
  }

  getXMax(): number {
    return Math.max(...[...this.livingCells].map(position => {return position.x}))
  }

  getYMin(): number {
    return Math.min(...[...this.livingCells].map(position => {return position.y}))
  }

  getYMax(): number {
    return Math.max(...[...this.livingCells].map(position => {return position.y}))
  }

  getZMin(): number {
    return Math.min(...[...this.livingCells].map(position => {return position.z}))
  }

  getZMax(): number {
    return Math.max(...[...this.livingCells].map(position => {return position.z}))
  }

  getWMin(): number {
    return Math.min(...[...this.livingCells].map(position => {return position.w}))
  }

  getWMax(): number {
    return Math.max(...[...this.livingCells].map(position => {return position.w}))
  }
}

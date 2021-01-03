import { Position, World } from "./cc3d";

describe("Position", () => {
  test("isEqual", () => {
    var position = new Position(1, 2, 3);
    expect(position.isEqual(new Position(1, 2, 3))).toBe(true);
    expect(position.isEqual(new Position(0, 0, 0))).toBe(false);
  }); 
});

describe("World", () => {

  var initialPositions = [
      new Position(1, 0, 0), new Position(2, 1, 0), 
      new Position(0, 2, 0), new Position(1, 2, 0), 
      new Position(2, 2, 0), new Position(2, 2, 1)];
  var initialDescription = ".#.\n..#\n###";

  test("constructor", () => {
    expect(new World(initialPositions, undefined).livingCells.length).toBe(6);
    expect(new World(undefined, initialDescription).livingCells.length).toBe(5);
  });

  test("toString", () => {
    expect(new World(undefined, initialDescription).toString()).toBe("---- generation 0 ----\nz = 0\n.#.\n..#\n###\n");
  });

  test("isLiving", () => {
    expect(new World(initialPositions).isLiving(2, 2, 1)).toBe(true);
    expect(new World(initialPositions).isLiving(0, 0, 0)).toBe(false);
  });

  test("createNextGeneration", () => {
    var world = new World([
      new Position(1, 0, 0), new Position(2, 1, 0), 
      new Position(0, 2, 0), new Position(1, 2, 0), 
      new Position(2, 2, 0)]);
    world.createNextGeneration();
    expect(world.livingCells.length).toBe(11);
    world.createNextGeneration();
    expect(world.livingCells.length).toBe(21);
    world.createNextGeneration();
    expect(world.livingCells.length).toBe(38);
    world.createNextGeneration();
    world.createNextGeneration();
    world.createNextGeneration();
    expect(world.livingCells.length).toBe(112);
  });

  test("getXMin", () => {
    expect(new World(initialPositions).getXMin()).toBe(0);
  });

  test("getXMax", () => {
    expect(new World(initialPositions).getXMax()).toBe(2);
  });

  test("getYMin", () => {
    expect(new World(initialPositions).getYMin()).toBe(0);
  });

  test("getYMax", () => {
    expect(new World(initialPositions).getYMax()).toBe(2);
  });

  test("getZMin", () => {
    expect(new World(initialPositions).getZMin()).toBe(0);
  });

  test("getZMax", () => {
    expect(new World(initialPositions).getZMax()).toBe(1);
  });

  test("countNeighbours", () => {
    expect(new World(initialPositions).countNeighbours(new Position(1, 2, 0))).toBe(4);
    expect(new World(initialPositions).countNeighbours(new Position(0, 0, 0))).toBe(1);
  });
});

import { Command, Crusade, Direction, Position, NavStep, NavStepBuilder, Navigator } from './nav-v1';

test("Crusade.constructor", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.EAST);    
})


test("Crusade.navigate - store navStep", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    expect(crusade.navSteps.length).toBe(0);
    crusade.navigate(new NavStep(Command.E, 10));
    expect(crusade.navSteps.length).toBe(1);
    expect(crusade.navSteps.pop()).toStrictEqual(new NavStep(Command.E, 10));
})

test("Crusade.navigate - move N", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.N, 10));
    expect(crusade.current).toStrictEqual(new Position(0, -10));
})

test("Crusade.navigate - move E", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.E, 10));
    expect(crusade.current).toStrictEqual(new Position(10, 0));
})

test("Crusade.navigate - move W", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.W, 10));
    expect(crusade.current).toStrictEqual(new Position(-10, 0));
})

test("Crusade.navigate - move S", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.S, 10));
    expect(crusade.current).toStrictEqual(new Position(0, 10));
})

test("Crusade.navigate - turn L", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.L, 90));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.NORTH);

    crusade.navigate(new NavStep(Command.L, 180));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.SOUTH);

    crusade.navigate(new NavStep(Command.L, 270));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.WEST);
})

test("Crusade.navigate - turn R", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.R, 90));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.SOUTH);

    crusade.navigate(new NavStep(Command.R, 180));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.NORTH);

    crusade.navigate(new NavStep(Command.R, 270));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.direction).toBe(Direction.WEST);
})

test("Crusade.navigate - move forward", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.NORTH);
    crusade.navigate(new NavStep(Command.F, 90));
    expect(crusade.current).toStrictEqual(new Position(0, -90));
    
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.F, 40));
    expect(crusade.current).toStrictEqual(new Position(40, 0));
    
    var crusade = new Crusade(new Position(0, 0), Direction.SOUTH);
    crusade.navigate(new NavStep(Command.F, 1));
    expect(crusade.current).toStrictEqual(new Position(0, 1));
    
    var crusade = new Crusade(new Position(10, 10), Direction.WEST);
    crusade.navigate(new NavStep(Command.F, 90));
    expect(crusade.current).toStrictEqual(new Position(-80, 10));

    var crusade = new Crusade(new Position(0, 0), Direction.NORTH);
    crusade.navigate(new NavStep(Command.F, -10));
    expect(crusade.current).toStrictEqual(new Position(0, 10));
})

test("Crusade.calcManhattenDistance", () => {
    var crusade = new Crusade(new Position(0, 0), Direction.EAST);
    crusade.navigate(new NavStep(Command.E, 17));
    crusade.navigate(new NavStep(Command.S, 8));
    expect(crusade.calcManhattenDistance()).toBe(25);
})

test("NavStep.fromString", () => {
    var navStep = new NavStepBuilder().fromString("F10").build()
    expect(navStep.command).toStrictEqual(Command.F);
    expect(navStep.amount).toBe(10);
})

test("Navigator.constructor", () => {
    var navigator = new Navigator("./nav_00.data");
    expect(navigator.navSteps.length).toBe(5);
    expect(navigator.navSteps[0]).toStrictEqual(new NavStep(Command.F, 10));
})

test("Navigator.cruise", () => {
    var navigator = new Navigator("./nav_00.data");
    navigator.cruise();
    expect(navigator.traveledDistance()).toBe(25);
})
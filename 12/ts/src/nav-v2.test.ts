import { Command, Crusade, Direction, Position, NavStep, NavStepBuilder, Navigator } from './nav-v2';

test("Crusade.constructor", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    expect(crusade.current).toStrictEqual(new Position(0, 0));
    expect(crusade.waypoint).toStrictEqual(new Position(10, -1));    
})


test("Crusade.navigate - store navStep", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    expect(crusade.navSteps.length).toBe(0);
    crusade.navigate(new NavStep(Command.E, 10));
    expect(crusade.navSteps.length).toBe(1);
    expect(crusade.navSteps.pop()).toStrictEqual(new NavStep(Command.E, 10));
})

test("Crusade.navigate - move waypoint N", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    crusade.navigate(new NavStep(Command.N, 10));
    expect(crusade.waypoint).toStrictEqual(new Position(10, -11));
})

test("Crusade.navigate - move waypoint E", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    crusade.navigate(new NavStep(Command.E, 10));
    expect(crusade.waypoint).toStrictEqual(new Position(20, -1));
})

test("Crusade.navigate - move waypoint W", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    crusade.navigate(new NavStep(Command.W, 10));
    expect(crusade.waypoint).toStrictEqual(new Position(0, -1));
})

test("Crusade.navigate - move waypoint S", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, -1));
    crusade.navigate(new NavStep(Command.S, 10));
    expect(crusade.waypoint).toStrictEqual(new Position(10, 9));
})

test("Crusade.navigate - rotate L", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(1, -3));
    crusade.navigate(new NavStep(Command.L, 90));
    expect(crusade.waypoint).toStrictEqual(new Position(-3, -1));

    var crusade = new Crusade(new Position(0, 0), new Position(1, -3));
    crusade.navigate(new NavStep(Command.L, 180));
    expect(crusade.waypoint).toStrictEqual(new Position(-1, 3));

    var crusade = new Crusade(new Position(0, 0), new Position(1, -3));
    crusade.navigate(new NavStep(Command.L, 270));
    expect(crusade.waypoint).toStrictEqual(new Position(3, 1));
})


test("Crusade.navigate - rotate R", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(-1, -2));
    crusade.navigate(new NavStep(Command.R, 90));
    expect(crusade.waypoint).toStrictEqual(new Position(2, -1));

    var crusade = new Crusade(new Position(0, 0), new Position(-1, -2));
    crusade.navigate(new NavStep(Command.R, 180));
    expect(crusade.waypoint).toStrictEqual(new Position(1, 2));

    var crusade = new Crusade(new Position(0, 0), new Position(-1, -2));
    crusade.navigate(new NavStep(Command.R, 270));
    expect(crusade.waypoint).toStrictEqual(new Position(-2, 1));
})

test("Crusade.navigate - move forward", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(1, 1));
    crusade.navigate(new NavStep(Command.F, 1));
    expect(crusade.current).toStrictEqual(new Position(1, 1));
    
    var crusade = new Crusade(new Position(0, 0), new Position(1, 1));
    crusade.navigate(new NavStep(Command.F, 10));
    expect(crusade.current).toStrictEqual(new Position(10, 10));

    var crusade = new Crusade(new Position(2, 0), new Position(2, 0));
    crusade.navigate(new NavStep(Command.F, 10));
    expect(crusade.current).toStrictEqual(new Position(22, 0));
    
})

test("Crusade.calcManhattenDistance", () => {
    var crusade = new Crusade(new Position(0, 0), new Position(10, 10));
    crusade.navigate(new NavStep(Command.F, 2));
    expect(crusade.calcManhattenDistance()).toBe(40);
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
    expect(navigator.traveledDistance()).toBe(286);
})
/* eslint-disable no-undef */
const { Ship, Gameboard, arrayOfShortArraysSearch } = require("./index.js");

const testShip = new Ship(4);

test('ship: length', () => {
    expect(testShip.length).toBe(4);
});

test('ship: sunk', () => {
    expect(testShip.sunk).toBe(false);
});

test('ship: get hit', () => {
    testShip.hit();
    expect(testShip.hits).toBe(1);
});

test('ship: get sunk', () => {
    for (let i = 0; i < 3; i++) {
        testShip.hit();
    }
    expect(testShip.sunk).toBe(true);
});

const testBoard = new Gameboard();
testBoard.placeShip(testShip, [1, 1], [1, 4])


test('add ship: check ship function', () => {
    expect(testShip.coordinates[3]).toStrictEqual([1, 4]);
});

test('add ship: check gameboard function', () =>{
    expect(arrayOfShortArraysSearch(testBoard.shipsAt, [1, 4])).toBe(3);
})
/* eslint-disable no-undef */

//I think I need a fresh test page. Research how

const { Ship, Gameboard, arrayOfShortArraysSearch, redPlayRandom } = require("./battleshipLogic.js");



test('returns array', () => {
    let x = redPlayRandom();
    
    expect(x.length).toBe(2)
})
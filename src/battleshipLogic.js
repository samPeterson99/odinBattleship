

const ships = [];

function Ship(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.coordinates = [];
}

Ship.prototype.hit = function() {
    this.hits++;
    this.isItSunk();
}

Ship.prototype.isItSunk = function() {
    this.hits >= this.length ? this.sunk = true : this.sunk = false;
}

function Gameboard() {
    this.missed = [];
    this.shipsHit = [];
    this.shipsAt = [];
    this.spotPlayed = [];
}

function Player() {
    this.board = new Gameboard();
    this.carrier = new Ship(5);
    this.battleship = new Ship(4);
    this.cruiser = new Ship(3);
    this.submarine = new Ship(3);
    this.destroyer = new Ship(2);

}



//how to find what coordinates belong to what ship in the receiveAttack function
Gameboard.prototype.placeShip = function(ship, startCoord, endCoord) {
    let newPush
    ships.push(ship);
    if (startCoord.at(0) === endCoord.at(0)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[1] += 1
        }
    } else if (startCoord.at(1) === endCoord.at(1)) {
        for (let i = 0; i < ship.length; i++) {
            newPush = startCoord.slice();
            ship.coordinates.push(newPush);
            this.shipsAt.push(newPush);
            startCoord[0] += 1
        }
    }
};

function arrayOfShortArraysSearch(array, value) {
    for (let index = 0; index < array.length; index++) {
        if (array[index][0] === value[0] && array[index][1] === value[1]) {
            return index;
        } 
    }
    return null
}

function whoDidItHit(attackCoord) {
    for (let ship of ships) {
        let index = arrayOfShortArraysSearch(ship.coordinates, attackCoord)
        if (Number.isInteger(index)) {
            ship.hit();
        }
    }
}

Gameboard.prototype.receiveAttack = function(attackCoord) {
    let index = arrayOfShortArraysSearch(this.shipsAt, attackCoord);
    if (index === null) {
        this.missed.push(attackCoord);
        return 'miss'
    } else {
        this.shipsHit.push(attackCoord);
        whoDidItHit(attackCoord);
        return 'hit'
    }
}

function redPlayRandom() {
    let play
    let testResult
    do {
        let x = Math.floor(Math.random() * 9);
        let y = Math.floor(Math.random() * 9);   
        play = [x, y];
        testResult = arrayOfShortArraysSearch(blue.board.spotPlayed, play)
    } while (testResult != null)
    console.log(play)
    return play
}

module.exports = { Ship, Player, Gameboard, arrayOfShortArraysSearch, redPlayRandom};